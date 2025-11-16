from flask import Flask, request, jsonify, render_template
import requests

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


# ---------------------------
# WIKIPEDIA SEARCH
# ---------------------------
def wikipedia_search(query):
    try:
        search_url = "https://en.wikipedia.org/w/api.php"
        search_params = {
            "action": "query",
            "list": "search",
            "srsearch": query,
            "format": "json"
        }
        data = requests.get(search_url, params=search_params).json()

        if not data.get("query", {}).get("search"):
            return None

        page_title = data["query"]["search"][0]["title"]

        summary_url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{page_title.replace(' ', '_')}"
        summary = requests.get(summary_url).json()

        return summary.get("extract", None)

    except:
        return None


# ---------------------------
# DUCKDUCKGO SEARCH
# ---------------------------
def duckduckgo_search(query):
    try:
        url = f"https://api.duckduckgo.com/?q={query}&format=json&no_html=1&skip_disambig=1"
        data = requests.get(url).json()

        if data.get("AbstractText"):
            return data["AbstractText"]

        for topic in data.get("RelatedTopics", []):
            if "Text" in topic:
                return topic["Text"]

        return None

    except:
        return None

# ---------------------------
# IMPROVED SMART SUMMARY (3–4 lines)
# ---------------------------
def summarize_answer(query, wiki, ddg):
    combined = ""

    if wiki:
        combined += wiki + " "
    if ddg:
        combined += ddg

    if not combined.strip():
        return "I couldn't find clear information. Try rephrasing your question."

    # Split into sentences
    sentences = combined.replace("\n", " ").split(". ")

    # Remove duplicates & empty sentences
    clean_sentences = []
    for s in sentences:
        s = s.strip()
        if s and s not in clean_sentences:
            clean_sentences.append(s)

    # Keep only first 3–4 meaningful sentences
    summary = ". ".join(clean_sentences[:4])

    # Always end with a period
    if not summary.endswith("."):
        summary += "."

    return summary


# ---------------------------
# MAIN CHATBOT ROUTE
# ---------------------------
@app.route("/get", methods=["POST"])
def get_bot_response():
    user_msg = request.form["msg"]

    wiki = wikipedia_search(user_msg)
    ddg = duckduckgo_search(user_msg)

    final_answer = summarize_answer(user_msg, wiki, ddg)

    return jsonify({"response": final_answer})


if __name__ == "__main__":
    app.run(debug=True)

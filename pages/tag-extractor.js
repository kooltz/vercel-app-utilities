import React from "react";
import axios from "axios";

function TagExtractor() {
  function handleExtract() {
    const elemInput = document.getElementById("url");
    const url = elemInput.value;
    //alert(url);
    axios.get("./api/tag-extract").then((response) => {
      const json = response.data;
      const elemTextArea = document.getElementById("result");

      if (json.hasOwnProperty("taglist") && json["taglist"].length > 0) {
        const taglist = json["taglist"][0];

        if (taglist.hasOwnProperty("tagName")) {
          const decodedStr = decodeURIComponent(taglist["tagName"]);
          const result = decodedStr.split(",");
          elemTextArea.value = result;
        }
      }
    });
  }
  return (
    <div>
      <h1>Tag Extractor</h1>
      <br />
      <div>
        <div>
          <span>URL : </span>
          <input type="text" id="url"></input>
          <button type="button" id="extract" onClick={handleExtract}>
            Extract
          </button>
        </div>
        <br />
        <div>
          <textarea id="result"></textarea>
        </div>
      </div>
    </div>
  );
}

export default TagExtractor;

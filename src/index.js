if (document.readyState !== "loading") {
  console.log("Document is ready!");
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("Document is ready after waiting");
    initializeCode();
  });
}

function initializeCode() {
  //https://stackoverflow.com/questions/6192517/how-to-use-an-input-field-as-query-parameter-to-a-destination
  let inputBtn = document.getElementById("submit-data");
  const form = document.getElementById("myForm");

  inputBtn.addEventListener("click", function () {
    let searhterm = document.getElementById("input-show").value;
    const url = "https://api.tvmaze.com/search/shows?q=" + searhterm;
    tvData();
    let html = "";
    async function tvData() {
      const dataPromise = await fetch(url);
      let dataJSON = await dataPromise.json();

      //https://www.javascripttutorial.net/javascript-fetch-api/
      dataJSON.forEach((data) => {
        let img = document.createElement("image");

        if (data.show.image === null) {
          let htmlSegment = `<div class="show-data">
                              <div class="show-info">
                                  <h1>${data.show.name}</h1>
                                  <p>${data.show.summary}</p>
                                </div>
                            </div>`;
          html += htmlSegment;
        } else {
          img = data.show.image.medium;
          let htmlSegment = `<div class="show-data">
                              <img src=${img}>
                              <div class="show-info">
                                <h1>${data.show.name}</h1>
                                <p>${data.show.summary}</p>
                              </div>
                            </div>`;
          html += htmlSegment;
        }
      });
      form.innerHTML += html;
    }
  });
}

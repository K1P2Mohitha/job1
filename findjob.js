document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector(".search input");
  const searchButton = document.querySelector(".btn-search");
  const jobCards = document.querySelectorAll(".card");

  let jobList = [];

  // Extract job details from the job cards
  jobCards.forEach(card => {
      let jobTitle = card.querySelector(".card-detail").textContent.trim();
      let companyName = card.querySelector("h3").textContent.trim();
      let location = card.querySelector(".card-loc").textContent.trim();
      let salary = card.querySelector(".card-salary p").textContent.trim();

      jobList.push({
          title: jobTitle,
          company: companyName,
          location: location,
          salary: salary,
          element: card
      });
  });

  // Fuse.js options for fuzzy searching (80% match)
  const options = {
      keys: ["title", "company"],  // Search in title and company name
      threshold: 0.2,  // Lower means more strict matching (0.2 ~ 80% match)
      includeScore: true
  };

  const fuse = new Fuse(jobList, options);

  // Function to filter jobs based on search input
  function searchJobs() {
      let searchText = searchInput.value.trim();

      if (searchText === "") {
          jobCards.forEach(card => card.style.display = "flex"); // Show all jobs if search is empty
          return;
      }

      const results = fuse.search(searchText);
      let matchedElements = results.map(result => result.item.element);

      jobCards.forEach(card => {
          if (matchedElements.includes(card)) {
              card.style.display = "flex";
          } else {
              card.style.display = "none";
          }
      });
  }

  // Add event listener for the search button
  searchButton.addEventListener("click", searchJobs);

  // Add event listener for "Enter" key press in the search input field
  searchInput.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
          searchJobs();
      }
  });
});
const val = document.querySelector(".value");
const btn = document.querySelector(".btn");
const disp = document.querySelector(".result-disp");
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

async function search(query) {
    try {
        const response = await fetch(`${url}${query}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        // Clear previous results
        disp.innerHTML = "";

        // Check if data is empty or undefined
        if (!data || data.length === 0) {
            disp.innerText = "No results found.";
            return;
        }

        // Loop through each meaning
        data.forEach((result) => {
            // Check if result has meanings
            if (result.meanings) {
                // Loop through each definition
                result.meanings.forEach((meaning, index) => {
                    // Check if meaning has definitions
                    if (meaning.definitions && meaning.definitions.length > 0) {
                        // Display the definition
                        const definition = document.createElement("p");
                        definition.innerText = `Meaning ${index + 1}: ${meaning.definitions[0].definition}`;
                        disp.appendChild(definition);
                    } else {
                        disp.innerText = "No definitions found.";
                    }
                });
            } else {
                disp.innerText = "No meanings found.";
            }
        });
    } catch (error) {
        console.error('Error:', error.message);
    }
}

btn.addEventListener('click', () => {
    if (val.value.trim() === "") {
        alert("Oops!!! Please enter the word.");
    } else {
        search(val.value.trim());
    }
});

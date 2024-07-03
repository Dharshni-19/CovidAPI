document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from the API
    fetch('https://data.covid19india.org/v4/min/data.min.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Extract state-wise data
            const affectedStates = getAffectedStates(data);

            // Display affected states on the UI
            displayAffectedStates(affectedStates);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Optionally show an error message on the UI
        });

    function getAffectedStates(data) {
        // Initialize an array to store affected states
        const affectedStates = [];

        // Iterate through each state
        Object.keys(data).forEach(stateCode => {
            const stateData = data[stateCode];
            const totalConfirmed = stateData.total.confirmed || 0; // Use 0 if data is not available

            // Check if the state has confirmed cases
            if (totalConfirmed > 0) {
                affectedStates.push({
                    state: stateCode,
                    totalConfirmed: totalConfirmed
                });
            }
        });

        return affectedStates;
    }

    function displayAffectedStates(affectedStates) {
        const stateListElement = document.getElementById('stateList');
        if (stateListElement) {
            // Clear any existing content
            stateListElement.innerHTML = '';

            // Create and append list items for each affected state
            affectedStates.forEach(state => {
                const listItem = document.createElement('a');
                listItem.classList.add('list-group-item', 'list-group-item-action');
                listItem.textContent = `${state.state}: ${state.totalConfirmed.toLocaleString()} confirmed cases`;
                stateListElement.appendChild(listItem);
            });
        }
    }
});

$(document).ready(function () {
            $("form").submit(function (e) {
                e.preventDefault(); // Prevent default form submission
                let formData = new FormData(this); // Get all form data, including files
                let bnt = document.getElementById('submit-bnt');
                bnt.disabled = !btn.disabled;
            
                $.ajax({
                    url: "/create-card/",  // Your Django view URL
                    type: "POST",
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        if (data.success) {
                            alert(data.message)
                            window.location.href = data.redirect
                        } else {
                            alert(data.message)
                            window.location.href = data.redirect
                        }
                                
                    },
                    error: function (xhr, error) {
                        alert(xhr)
                                
                    }
                });
            });
        });       



function expandDescription() {
    let description = document.getElementById("description");
    description.rows = 6;  
    description.style.width = "90%";  
    description.style.height = "200px";  
    description.style.boxShadow = "0 0 15px rgba(255, 0, 120, 1)";  
}

function resetDescription() {
    let description = document.getElementById("description");
    description.rows = 2;  
    description.style.width = "65%";  
    description.style.height = "auto";  
    description.style.boxShadow = "0 0 10px rgba(0, 255, 255, 0.4)";  
}
        
        
        
        
function updatePlayerLabel() {
    const mode = document.getElementById("mode").value;
    const minPlayersLabel = document.getElementById("min_players_label");
    const minPlayersInput = document.getElementById("min_players");

    if (mode === "solo") {
        minPlayersLabel.innerText = "Minimum Players:";
        minPlayersInput.min = 40;  
        minPlayersInput.max = 48;  
        minPlayersInput.placeholder = "Minimum Players (10+)";
    } else if (mode === "duo") {
        minPlayersLabel.innerText = "Minimum Duo:";
        minPlayersInput.min = 20;
        minPlayersInput.max = 24;  
        minPlayersInput.placeholder = "Minimum Duo Teams (8+)";
    } else {
        minPlayersLabel.innerText = "Minimum Teams:";
        minPlayersInput.min = 10;
        minPlayersInput.max = 12;  
        minPlayersInput.placeholder = "Minimum Teams (4+)";
    }

calculatePrizePool();  
}





function updateBattleMode() {
    const game = document.getElementById("game_name").value;
    const battleMode = document.getElementById("battle_mode");
    const teamMode = document.getElementById("mode");

    $.ajax({
        url: "{% url 'update_create_card' %}", // Your server endpoint
        type: 'POST', // Or GET, etc.
        contentType: "application/json",
        data: JSON.stringify({game: game}), // Data to send to the server
        success: function(data) {
            battleMode.innerHTML = ""; 
            teamMode.innerHTML = "";

            let battleModeOptions = data.BattleModeList;
            let teamModeOptions = data.TeamModeList;
            
            battleModeOptions.forEach(Bmode => {
                let option = document.createElement("option");
                option.value = Bmode;
                option.text = Bmode;
                battleMode.appendChild(option);
            });

            teamModeOptions.forEach(Tmode => {
                let option = document.createElement("option");
                option.value = Tmode;
                option.text = Tmode;
                teamMode.appendChild(option);
            });
            updateEntryFeeOptions();

        },
        error: function(error) {
            // Handle errors
            battleMode.innerHTML = ""; 
            teamMode.innerHTML = "";
            alert("An error occured, Try again!");
        }
        });


}


function updateEntryFeeOptions() {
    const game = document.getElementById("game_name").value;
    const mode = document.getElementById("mode").value;
    const entryFee = document.getElementById("entry_fee");

    $.ajax({
        url: "{% url 'update_create_card' %}", // Your server endpoint
        type: 'POST', // Or GET, etc.
        contentType: "application/json",
        data: JSON.stringify({game:game, mode: mode}), // Data to send to the server
        success: function(data) {
            entryFee.innerHTML = ""; 
            let feeOptions = data.feelist;
            feeOptions.forEach(fee => {
                let option = document.createElement("option");
                option.value = fee;
                option.text = `₹${fee}`;
                entryFee.appendChild(option);
            });

        },
        error: function(error) {
            // Handle errors
            entryFee.innerHTML = ""; 
            alert("An error occured, Try again!");

        }
    });

    calculatePrizePool();
}

function calculatePrizePool() {
    const entryFee = parseInt(document.getElementById("entry_fee").value);
    const minPlayers = parseInt(document.getElementById("min_players").value) || 0;
    const prizePool = Math.floor((entryFee * minPlayers) * 0.5);
    document.getElementById("prize_pool").value = prizePool;
    }

document.getElementById("min_players").addEventListener("input", calculatePrizePool);

// Initialize entry fee options on page load
updateBattleMode();
//updateEntryFeeOptions();

const highlightError = function(element) {
    element.classList.add('error');
}

const removeError = function(element) {
    element.classList.remove('error');
}

// window.onload = function(){
//     document.getElementById('requestform').addEventListener('submit', function(event) {
//         //console.log("test");
//         event.preventDefault(); //stop form from submitting
//         // check required fields
//         var requiredField = document.getElementsByClassName("required");
//         for(var i = 0; i < requiredField.length; i++){
//             var inputs = requiredField[i];
//             //removeError(requiredField.parentElement);
//             removeError(inputs.parentElement);
//             // high light errors
//             if(inputs.value == null || inputs.value.trim() == ''){
//                 highlightError(inputs.parentElement);
//             }

//         }
//     });

// }
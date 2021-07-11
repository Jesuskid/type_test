let input = document.getElementById('input');
let typed = document.getElementById('typed');
let text_box = document.getElementById('text');
let button = document.getElementById('button');
var text = ''
var score = 0



text_box.value= 'Welcome to the online type speed test. Press start to to take a test'

function  array_to_string(array){
    var string = ''
    for (i in array){
        string += array[i]+' '
    }
    return string
}







function callData(){
    fetch('/array', {
        method: 'GET',
    }).then(function (response){
        response.json().then(function (data){
            text = data
            text_box.value = array_to_string(text)
            text_box.disabled = true

        })
    })

}



function remove(arr, value){
    return arr.filter(function(element){
        return element != value
    })
}





async function check() {
    let inputed_value = input.value;
    let new_inputed = inputed_value.trim()
    let removal_index = 0
    for(i in text){
        if(text[i] === new_inputed){
            console.log(text[i])
            removal_index = parseInt(i)
            //new_text = re_insert(text)
            console.log(removal_index)
            text = remove(text, text[removal_index])
            text_box.value =  array_to_string(text)
            input.value = ''
            score += 1
            typed.innerText = 'Number of words typed:'+score
            console.log(text)



        }
    }



}




map = {32:false}

document.addEventListener('keydown', function (e){
    if(e.keyCode in map){
        check()
        map[e.keyCode] = true;


    }
})


document.addEventListener('keyup', function (e){
        if (e.keyCode in map) {
            map[e.keyCode] = false;
        }
})


function return_congrats(score){
  message = ''

  if (score < 30){
     message = '  You type below the average typing speed'

  }else if(score <= 40 && score >= 30){
   message = ' You type slightly above average'
  }else if(score <= 85 && score >= 80){
   message = ' You type with a professional speed'
  }else if(score >= 212 ){
   message = ' You rank amongst one of the fastest typist worldwide'
  }else{
  message = ' You type above the average typing speed'
  }

  return message
}


function timer(){
    callData()
    score = 0
    seconds = document.getElementById('countdown')
    second=60
    input.disabled = false
    input.focus()
    button.disabled = true
    var count_down = setInterval(function (){
        second--
        if (second < 10){
            seconds.textContent = '0:0'+second
        }else{
            seconds.textContent = '0:'+second
        }

        if(second <= 0) {
            clearInterval(count_down)
            input.disabled = true
            congrats = return_congrats(score)
            text_box.value = 'You type '+score+' words per minute.'+congrats
            document.getElementById('button').innerText = 'Try again'
            input.value = ''
            button.disabled = false
        };

    }, 1000)
}
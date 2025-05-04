let start_btn = document.querySelector('#start_btn')
let board = document.querySelector('.board')
let buttons = document.querySelector('.buttons')
let input_color = document.querySelector('.input_color')
let erase_btn = document.querySelector('.erase_btn')
let reset_btn = document.querySelector('.reset_btn')
let fill_btn = document.querySelector('.fill_btn')
let save_btn = document.querySelector('.save_btn')
let draw_btn = document.querySelector('.draw_btn')

let current_color = '#fff'
let is_erasing = false
let is_mousedown = false

document.body.addEventListener('mousedown', function(){
    is_mousedown = true
})

document.body.addEventListener('mouseup', function(){
    is_mousedown = false
})

input_color.addEventListener('click',function(){
    current_color = input_color.value
})

start_btn.addEventListener('click', function(){
    start_btn.style.display = 'none'
    buttons.style.display = 'flex'
    board.style.display = 'grid'
    board_create()
})

function board_create(){
    board.innerHTML = ''
    for (let i = 0; i<5000; i++){
        let cell = document.createElement('div')
        cell.classList.add('cell')
        cell.addEventListener('mousedown', function(){
            current_color = input_color.value
            cell.style.backgroundColor = is_erasing ? '#ffffff' : current_color
        })

        cell.addEventListener('mouseenter', function(){
            if (is_mousedown){
                current_color = input_color.value
                cell.style.backgroundColor = is_erasing ? '#ffffff' : current_color                
            }
        })
        board.appendChild(cell)
    }
    const saved_picture = JSON.parse(localStorage.getItem('save_picture'))
    if (saved_picture){
        const cells = document.querySelectorAll('.cell')
        cells.forEach((item, index)=>{
        item.style.backgroundColor = saved_picture[index]
    })        
    }
}

draw_btn.addEventListener('click', function(){
    is_erasing = false
    current_color = input_color.value
})

erase_btn.addEventListener('click', function(){
    is_erasing = true
})

reset_btn.addEventListener('click', function(){
    const cells = document.querySelectorAll('.cell')
    cells.forEach((item)=>{
        item.style.backgroundColor = '#ffffff'
    })
    //localStorage.removeItem('save_picture')
})

fill_btn.addEventListener('click', function(){
    current_color = input_color.value
    /*const cells = document.querySelectorAll('.cell')
    cells.forEach((item)=>{
        item.style.backgroundColor = current_color
    })*/
    anime({
    targets: '.cell',
    backgroundColor: current_color,
    duration: 500,
    easing: 'linear',
    delay: (elem, index)=> index*0.3
})    
})


function paint(e){
    if (e.target.classList.contains('cell')){
        current_color = input_color.value 
        e.target.style.backgroundColor = is_erasing ? '#ffffff' : current_color
    }
}

save_btn.addEventListener('click', function(){
    const cells = document.querySelectorAll('.cell')
    cell_colors = []

    cells.forEach((cell)=>{
        cell_colors.push(cell.style.backgroundColor)
    })
    localStorage.setItem('save_picture', JSON.stringify(cell_colors))
})
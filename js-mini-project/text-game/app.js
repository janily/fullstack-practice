const textEle = document.getElementById('text')
const optBtns = document.getElementById('option-btns')


function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textEle.innerText = textNode.text
    while (optBtns.firstChild) {
        optBtns.removeChild(optBtns.firstChild)
    }

    textNode.options.forEach( option => {
        if(showOption(option)) {
            const buuton = document.createElement('button')
            buuton.innerText = option.text
            buuton.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optBtns.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if( nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id:1,
        text: '哈哈哈哈哈哈',
        options: [
            {
                text: 'go',
                setState: {blueGoo: true},
                nextText: 2
            },
            {
                text: 'done',
                nextText: 2
            }
        ]
    },
    {
        id:2,
        text: '哈哈哈哈哈哈噗噗噗噗噗',
        options: [
            {
                text: 'go go go go go',
                requiredState: (currentState) => currentState.blueGoo,
                setState: {blueGoo:false, sword: true},
                nextText: 3
            },
            {
                text: 'go go go go go',
                requiredState: (currentState) => currentState.blueGoo,
                setState: {blueGoo:false, shield: true},
                nextText: 3
            },
            {
                text: 'go go go go go done',
                requiredState: (currentState) => currentState.blueGoo,
                setState: {blueGoo:false, shield: true},
                nextText: 3
            },
            {
                text: 'go go go go go done',
                requiredState: (currentState) => currentState.blueGoo,
                setState: {blueGoo:false, shield: true},
                nextText: 3
            },
            {
                id: 4,
                text: '休息下！！！',
                options: [
                  {
                    text: '重来',
                    nextText: -1
                  }
                ]
              },
              {
                id: 5,
                text: '身体是革命的本钱！！',
                options: [
                  {
                    text: '重来',
                    nextText: -1
                  }
                ]
              },
        ]
    }
]
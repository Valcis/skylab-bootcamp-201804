const http = require('http')

const requester = {
    _listeners: {},

    on(event, listener) {
        if (!this._listeners[event]) this._listeners[event] = []

        this._listeners[event].push(listener)
    },

    call(url) {
        http.get(url, resp => {
            resp.setEncoding('utf8')

            let content = ''

            resp.on('data', chunk => content += chunk)

            resp.on('end', () => {
                const listeners = this._listeners.response

                if (listeners && listeners.length)
                    listeners.forEach(listener => listener(content))
            })
        })
    }
}

// demo

requester.on('response', content => console.log(`number of chars = ${content.length}`))
requester.on('response', content => {
    let count = 0

    for (let i = 0; i < content.length; i++)
        if (content[i] === 'a') count++

    console.log(`number of a's = ${count}`)
})
requester.on('response', content => {
    const count = content.split(' ').reduce((accum, word) => word.toLowerCase() === 'google'? ++accum : accum, 0)

    console.log(`number of html's = ${count}`)
})

requester.call('http://www.google.es')
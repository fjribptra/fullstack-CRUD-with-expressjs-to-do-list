const p = document.getElementsByTagName('p')[0]
const listWrapper = document.querySelector('.list-wrapper')
const notification = document.getElementById("notification")
const listInput = document.getElementById("list")

const fetcher = async () => {
    const response = await fetch("http://localhost:3000/list")
    let data = await response.json()
    console.log(data)
    const element = data.map((item) => {
        return `<li id=${item.id}>
                    <p>${item.list}</p>
                    <div class="button-wrapper">
                        <button onclick="deleteItem(${item.id})">X</button>
                        <button onclick="setIsDone(${item.id})">done</button>
                    </div>
                </li>`
    })
    listWrapper.innerHTML = element
}

fetcher()

const deleteItem = async (id) => {
    console.log(id)
    const confirmation = confirm("Are you sure to delete this item?")
    if(!confirmation) return
    const response = await fetch(`http://localhost:3000/list/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id}) //if you do not want to send any addional data,  replace the complete JSON.stringify(YOUR_ADDITIONAL_DATA) with null
      })
    const data = await response.text()
    console.log(data)
    notification.innerHTML = data
}

const addItem = async () => {
    console.log(document.getElementById("list").value)
    console.log(document.getElementById("done").value)
    const response = await fetch("http://localhost:3000/list", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            list: listInput.value,
            is_done: document.getElementById("done").value
        })
    })
    const data = await response.text()
    notification.innerHTML = data
}

const setIsDone = async (id) => {
    const response = await fetch(`http://localhost:3000/list/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            is_done: document.getElementById("done").value
        })
    })

    const data = await response.text()
    console.log(data)
}




// p.innerHTML = fetcher()
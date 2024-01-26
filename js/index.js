const doc = document;
const btnInfo = doc.querySelector('.btn-database');
const boxInfo = doc.querySelector('.database-block');

const baseUrl = 'http://localhost:3000/';
const resources = {
    posts: 'posts',
    comments: 'comments',
    profile: 'profile'
};

btnInfo.onclick = () => {
    boxInfo.innerHTML = '';
    renderFormAdd();

    fetch(baseUrl + resources.posts)
        .then((response) => response.json())
        .then((info) => renderListDatabase(info));
}

const inputTitle = doc.querySelector('.info-add');
const inputBtn = doc.querySelector('.btn-add-post');

inputBtn.onclick = () => {
    const inputTitleValue = inputTitle.value;

    createPost(inputTitleValue);
    inputTitle.value = '';
}

renderFormAdd();

function renderListDatabase(info) {
    for(let item of info) {
        const { id, title } = item;
        
        const listBlock = doc.createElement('ul');
        const listItem = doc.createElement('li');
        const listUrl = doc.createElement('a');
        const editIcon = doc.createElement('img');
        const deleteIcon = doc.createElement('img');

        listItem.className = 'database-list';
        listUrl.innerText = title;
        listUrl.href = `#`;
        listUrl.dataset.postId = id;
        editIcon.className = 'edit-icon';
        editIcon.src = 'img/edit.png';
        deleteIcon.className = 'edit-icon';
        deleteIcon.src = 'img/remove.png';

        listUrl.onclick = (event) => {
            event.preventDefault();

            const postId = event.target.dataset.postId;

            if (postId) {

                const selectedPost = info.find(post => post.id === postId);

                if (selectedPost) {
                    renderInfoBlock(selectedPost);
                }
            }
        };

        listItem.append(listUrl, editIcon, deleteIcon);
        listBlock.append(listItem);
        boxInfo.append(listBlock);
    };
}

function renderFormAdd() {
    const infoBlock = doc.querySelector('.info-block-wrapper');

    infoBlock.innerHTML = 
    `
        Title
        <input type="text" class="info-add">

        <button class="btn-add-post">
          Add post
        </button>
    `;
}

function createPost(newPost) {
    fetch(baseUrl + resources.posts, {
        method: 'POST',
        headers: {
            'content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ title: newPost })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            fetchPosts();
    });
}

function renderInfoBlock(postInfo) {
    infoWindow = new ModalWindow({ w: 500, h: 300 }, { top: 200, left: 500 }, postInfo.id, postInfo.title);
    infoWindow.create();
    console.log('test2', postInfo.id);
}


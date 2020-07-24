const siteList = $(".siteList");
const lastLi = siteList.find('li.last');
const save = localStorage.getItem('save');
const saveObject = JSON.parse(save);
const hashMap = saveObject || [
    {loge : "B", url : 'https://www.bilibili.com/'}
]
let simplifyUrl = (url)=>{
     let url2 = url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '');
     return url2.length < 17 ?  url2 : url2.replace(/\..*/,'')
}

const render=()=>{
    siteList.find('li:not(.last)').remove();
    hashMap.forEach((node, index)=>{
        const $li = $(
            `
                <li>
                    <div class="logo">${node.loge}</div>
                    <svg class="edit">
                        <use xlink:href="#icon-edit"></use>
                    </svg>
                    <p class="site">${simplifyUrl(node.url)}</p>
                </li>
            `
        ).insertBefore(lastLi);

        $li.on('click',()=>{
            window.open(hashMap[index].url)
        })
        $li.on('click','.edit',(e)=>{
            e.stopPropagation();
            hashMap.splice(index, 1);
            render();
        })
    })
}
render();
$('.add').on('click',()=>{
    let url = prompt('请问你要添加的网址是？')
    hashMap.push({
        loge : simplifyUrl(url)[0].toUpperCase(),
        url : url
    })
    render();
})

window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap);
    localStorage.setItem('save',string);
}

$(document).on('keypress',(e)=>{
    const key=e.key;
    for(let i=0;i<hashMap.length;i++){
        if(hashMap[i].loge.toLowerCase() === key){
            window.open(hashMap[i].url)
        }
    }
})


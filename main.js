const siteList = $(".siteList");
const lastLi = siteList.find('li.last');
const save = window.localStorage.getItem("save");
let saveObject
if(save !== undefined){
    saveObject = JSON.parse(save);
}
let hashMap = saveObject || [
    {loge : "A", url : 'https://www.acfun.cn/'},
    {loge : "B", url : 'https://www.bilibili.com/'},
    {loge : "E", url : 'https://www.edmodo.com/'},
    {loge : "B", url : 'https://www.baidu.com/'},
    {loge : "F", url : 'https://www.facebook.com/'},
    {loge : "G", url : 'https://www.google.com/'}
]


let simplifyUrl = (url)=>{
     return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '')
}

const render=()=>{
    siteList.find('li:not(.last)').remove();
    hashMap.forEach((node, index)=>{
        const $li = $(
            `
                <li onselectstart="return false;" unselectable="on">
                    <div class="logo">${node.loge}</div>
                    <svg class="edit">
                        <use xlink:href="#icon-edit"></use>
                    </svg>
                    <p class="site">${simplifyUrl(node.url)}</p>
                </li>
            `
        ).insertBefore(lastLi);
        $li.on('click',()=>{
            window.open(node.url)
        })
        $li.on('click','.edit',(e)=>{
            let c = confirm("是否删除该网页？点否则进入网址编辑")
            if(c){
                e.stopPropagation();
                hashMap.splice(index, 1);
            }else{
                let r = prompt('请问网址要修改成？', node.url);
                if( r !== null){
                    node.url = r;
                    node.loge = simplifyUrl(node.url)[0].toUpperCase();
                }
                e.stopPropagation();
            }
            render();
        })
        let a,b,c,d;
        $li.on('touchstart',(e)=>{
            a = e.timeStamp
           c=e.targetTouches[0]
        })
        $li.on('touchend',(e)=>{
            b = e.timeStamp 
            d=e.changedTouches[0]
            if(c.clientX ===d.clientX &&c.clientY ===d.clientY){
            if((b-a) > 300){
                    let c = confirm("是否删除该网页？点否则进入网址编辑")
                    if(c){
                        e.stopPropagation();
                        hashMap.splice(index, 1);
                    }else{
                        let r = prompt('请问网址要修改成？', node.url);
                        if( r !== null){
                            node.url = r;
                            node.loge = simplifyUrl(node.url)[0].toUpperCase();
                        }
                        e.stopPropagation();
                    }
                    render();
            }
        }
        })
    })
}
render();
$('.last').on('click',()=>{
    let url = prompt('请问你要添加的网址是？(请以HTTP或者HTTPS开头)')
    hashMap.push({
        loge : simplifyUrl(url)[0].toUpperCase(),
        url : url
    })
    alert(hashMap)
    render();
})
$('input').on('focus',()=>{

        document.querySelectorAll('input')[0].className='change';
})
$('input').on('blur',()=>{

        document.querySelectorAll('input')[0].className='type';
})


window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap);
    window.localStorage.setItem("save", string);

}

// $(document).on('keypress',(e)=>{
//     const key=e.key;
//     for(let i=0;i<hashMap.length;i++){
//         if(hashMap[i].loge.toLowerCase() === key){
//             window.open(hashMap[i].url)
//         }
//     }
// })


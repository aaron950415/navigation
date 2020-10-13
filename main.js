const siteList = $(".siteList");
const lastLi = siteList.find('li.last');
const save = window.localStorage.getItem("save");
let saveObject
if(save !== undefined){
    saveObject = JSON.parse(save);
}
let hashMap = saveObject || [
    {logo : "A", url : 'https://www.acfun.cn/',name:null},
    {logo : "B", url : 'https://www.bilibili.com/',name:null},
    {logo : "E", url : 'https://www.edmodo.com/',name:null},
    {logo : "B", url : 'https://www.baidu.com/',name:null},
    {logo : "F", url : 'https://www.facebook.com/',name:null},
    {logo : "G", url : 'https://www.google.com/',name:null}
]


let simplifyUrl = (url)=>{
     return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '')
}

const render=()=>{
        const string = JSON.stringify(hashMap);
    window.localStorage.setItem("save", string);
    siteList.find('li:not(.last)').remove();
    hashMap.forEach((node, index)=>{
        const $li = $(
            `
                <li onselectstart="return false;" unselectable="on">
                    <div class="logo">${node.logo}</div>
                    <svg class="edit">
                        <use xlink:href="#icon-edit"></use>
                    </svg>
                    <p class="site">${node.name}</p>
                </li>
            `
        ).insertBefore(lastLi);
        $li.on('click',()=>{
            window.open(node.url)
        })
        $li.on('click','.edit',(e)=>{
            let c = confirm("是否删除该网页？点取消则进入网址编辑")
            if(c){
                e.stopPropagation();
                hashMap.splice(index, 1);
            }else{
                let r = prompt('请问网址名要修改成？', node.name);
                let k = prompt('请问网址要修改成？', node.url);
                if( r !== null){
                    node.name = r;
                    node.logo =simplifyUrl(k)[0].toUpperCase(),
                    node.url = k;
                    
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
                    let c = confirm("是否删除该网页？点取消则进入网址编辑")
                    if(c){
                        e.stopPropagation();
                        hashMap.splice(index, 1);
                    }else{
                        let r = prompt('请问网址名要修改成？', node.name);
                        let k = prompt('请问网址名要修改成？', node.url);
                        if( r !== null){
                            
                            node.url = k;
                            node.logo =simplifyUrl(k)[0].toUpperCase(),
                            node.name = r;
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
    let name = prompt('请问你要添加的网址名是？')
    let url = prompt('请问你要添加的网址是？(请以HTTP或者HTTPS开头)')
    if(url===null){
        return
    }
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        name : name,
        url : url
    })
    render();
})
$('input').on('focus',()=>{
        document.querySelectorAll('input')[0].className='change';
})
$('input').on('blur',()=>{

        document.querySelectorAll('input')[0].className='type';
})


// window.onbeforeunload = ()=>{
//     const string = JSON.stringify(hashMap);
//     window.localStorage.setItem("save", string);

// }

// $(document).on('keypress',(e)=>{
//     const key=e.key;
//     for(let i=0;i<hashMap.length;i++){
//         if(hashMap[i].logo.toLowerCase() === key){
//             window.open(hashMap[i].url)
//         }
//     }
// })


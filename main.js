const siteList = $(".siteList");
const lastLi = siteList.find('li.last');
const save = localStorage.getItem('save');
const saveObject = JSON.parse(save);
const hashMap = saveObject || [
    {loge : "B", url : 'https//www.bilibili.com'}
]
const simplifyUrl = (url)=>{
    return url.replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .replace(/\/.*/, '')
}

const $li = $(
    `
        <li>
            <div class="logo">${hashMap.loge}</div>
            <svg class="edit">
                <use xlink:href="#icon-edit"></use>
            </svg>
            <p class="site">${simplify}</p>
        </li>
    `
).insertBefore($lastLi);


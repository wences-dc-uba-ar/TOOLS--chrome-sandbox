const info = {};
function deepen(global, pathString) {
    let pathArray = pathString.split("/");
    let result = global;
    while (pathArray.length) {
        head = pathArray.shift();
        if (!result[head]) {
            result[head] = {};
        }
        result = result[head];
    }
    return global;
}
// function showinfo(info) {
//      console.log(JSON.stringify(info, undefined, 2));
// }

let temp = [];
temp.reduce(deepen, info);

function fill_interest(info) {
    let collection = Array.from(document.getElementsByClassName("pv-entity__summary-title-text"));
    collection.forEach((e, i) => {
        let title = e.innerText;
        let conta = e.parentNode.parentNode.parentNode.parentNode.className.split(" ");
        conta = conta.filter((cn) => cn.search("ember-view|flex-column|display-flex|pv-profile-section__card-item|pv-interest-entity") == -1);
        // conta = conta.join(",").replace("interest-", "");
        console.log([title, conta]);
        // info["interest"][conta][title] = title;
    });
}

paths.reduce(deepen, info);

console.log(JSON.stringify(info, undefined, 2));

cp = "interest-content pv-entity__summary-title-text".split(" ");

function classFinder(classpath, element) {
    result = [];
    while ((classname = classpath.shift())) {
        Array.prototype.forEach.call(element.getElementsByClassName(classname), (e) => {
            if (classpath.length) {
                classFinder(classpath, e).forEach((se) => {
                    result.push(classname + "/" + se);
                });
            } else {
                result.push(e.innerText);
            }
        });
    }
    return result;
}

function add_interest_content(temp) {
    Array.forEach(
        (e1) => {
            Array.forEach((e2) => {
                temp.push(e2.innerText);
            }, e1.getElementsByClassName("pv-entity__summary-title-text"));
        },

        document.getElementsByClassName("interest-content")
    );
}

function getElementsByXPath(path) {
    result = [];
    iterator = new XPathEvaluator().evaluate(path, document.documentElement, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

    try {
        var thisNode = iterator.iterateNext();

        while (thisNode) {
            console.log(thisNode.textContent);
            result.push(thisNode.textContent);
            thisNode = iterator.iterateNext();
        }
    } catch (e) {
        console.log("Error: Document tree modified during iteration " + e);
    }
    return result;
}

let cn = (classname) => `*[contains(@class,'${classname}')]`;

let paths = [
    ["name", `.//${cn("t-24")}//text()`],
    // ["cosas", './/*[contains(@class,"pv-entity__summary-title-text")]/text()'],
    // ["p",`.//${cn("interest-content")}//${cn("pv-entity__summary-title-text")}`],
];
// ["mas", "span[contains(@class,'pv-entity__summary-title-text']"],

let info = {};
paths.forEach((name, path) => {
    info[name] = getElementsByXPath(path);
});

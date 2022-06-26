document.addEventListener('DOMContentLoaded', function(){
    document.getElementById("task1").addEventListener("click", Task1);
    document.getElementById("task2").addEventListener("click", Task2);
    document.getElementById("task3").addEventListener("click", Task3);
    document.getElementById("task4").addEventListener("click", Task4);
    document.getElementById("task5").addEventListener("click", Task5);
    document.getElementById("task6").addEventListener("click", Task6);
    document.getElementById("task7").addEventListener("click", Task7);
    document.getElementById("task8").addEventListener("click", Task8);
    document.getElementById("showSource").addEventListener("click", ShowSource);
    document.getElementById("hideSource").addEventListener("click", HideSource);
}, false);

function CheckIsArray(array){
    return Array.isArray(array);
}

function ShowCondition(conditionText){
    let block = document.getElementById("task_condition");
    if (block)
    {
        block.hidden = false;
        let divs =block.getElementsByTagName("div");
        if (divs && divs.length>0)
        {
            divs[0].innerHTML = conditionText;
        }
    }
    document.getElementById("answer").hidden = true;
    document.getElementById("additional").hidden = true;
    document.getElementById("info").textContent = null;
    document.getElementById("params").value = null;
    document.getElementById("info2").hidden = true;
    document.getElementById("info2").textContent = null;
    document.getElementById("params2").hidden = true;
    document.getElementById("params2").value = null;
    clearError();
    document.getElementById("result").removeEventListener("click", FuncToTask5);
    document.getElementById("result").removeEventListener("click", FuncToTask6);
    document.getElementById("result").removeEventListener("click", FuncToTask7);
    document.getElementById("result").addEventListener("click", FuncToTask8);
}

function clearError(){
    let error = document.getElementById("error");
    error.textContent = null;
    error.hidden = true;
}

function ShowAnswer(result){
    let block = document.getElementById("answer");
    if (block)
    {
        block.hidden = false;
        let answerPlaces =block.getElementsByTagName("textarea");
        if (answerPlaces && answerPlaces.length>0)
        {
            answerPlaces[0].textContent = JSON.stringify(result,null,'\t');
        }
    }
}

function ShowSource(){
    let block = document.getElementById("source");
    if (block)
    {
        block.hidden = false;
        document.getElementById("showSource").hidden=true;
        document.getElementById("hideSource").hidden=false;
        let txtAreas =block.getElementsByTagName("textarea");
        if (txtAreas && txtAreas.length>0)
        {
            txtAreas[0].textContent = JSON.stringify(sourceArray,null,'\t');
        }
    }
}

function HideSource(){
    document.getElementById("hideSource").hidden=true;
    document.getElementById("source").hidden=true;
    document.getElementById("showSource").hidden=false;
}

function ShowAdditional(str){
    let addBlock = document.getElementById("additional");
    if (addBlock)
    {
        addBlock.hidden=false;
        document.getElementById("info").textContent = str;
    }
}

function ShowAdditional2(str){
    let info = document.getElementById("info2");
    let param = document.getElementById("params2");
    if (info && param)
    {
        info.hidden=false;
        param.hidden = false;
        info.textContent = str;
    }
}

function NewArrayWithDistinctElement(nameObject){
    return sourceArray.reduce((prev,cur)=>{

        if (CheckIsArray(cur[nameObject]))
        {
            cur[nameObject].forEach(element=>{
                if (prev.indexOf(element) === -1)
                {
                    prev.push(element);
                }
            });
        }
        return prev;
    },[])
}

function FuncToTask5(){
    clearError();
    let year = document.getElementById("params").value;
    let error = document.getElementById("error");
    if (isNaN(parseInt(year)) && !isFinite(year))
    {
        error.textContent = "Значение года выпуска должно быть числом";
        error.hidden = false;
        return;
    }
    let result = FilterByYear(sourceArray,parseInt(year));
    ShowAnswer(result);
}

function FuncToTask6(){
    clearError();
    let str = document.getElementById("params").value;
    let err = document.getElementById("error");
    if (!str)
    {
        err.textContent = "Название фильма не может быть пустым";
        err.hidden = false;
        return;
    }
    let result = FilterByName(sourceArray,str);
    ShowAnswer(result);
}

function FuncToTask7(){
    clearError();
    let str = document.getElementById("params").value;
    let err = document.getElementById("error");
    if (!str)
    {
        err.textContent = "Название фильма или его сюжет не может быть пустым";
        err.hidden = false;
        return;
    }
    let result = FilterByNameOrPlot(sourceArray,str);
    ShowAnswer(result);
}

function FuncToTask8(){
    clearError();
    let field = document.getElementById("params").value;
    let val = document.getElementById("params2").value;
    let err = document.getElementById("error");
    if (!field)
    {
        err.textContent = "Название поля не может быть пустым";
        err.hidden = false;
        return;
    }
    if (!val)
    {
        err.textContent = "Значение поля не может быть пустым";
        err.hidden = false;
        return;
    }
    let result = FilterByAnyField(sourceArray,field,val);
    ShowAnswer(result);
}

function Task1(){
   let condition ="Собрать в массив все жанры фильмов (без повторения)";

   if (CheckIsArray(sourceArray))
   {
       ShowCondition(condition);
       let genres = NewArrayWithDistinctElement("genre");
       ShowAnswer(genres);
   }
}

function Task2(){
    let condition ="Собрать в массив всех актеров всех фильмов (без повторения)";
    if (CheckIsArray(sourceArray))
    {
        ShowCondition(condition);
        let actors = NewArrayWithDistinctElement("actors");
        ShowAnswer(actors);
    }
}

function Task3(){
    let condition ="Отсортировать фильмы по рейтингу по убыванию";
    if (CheckIsArray(sourceArray))
    {
        ShowCondition(condition);
        let sortArray = Object.assign([], sourceArray);
        sortArray.sort((a,b)=>b.imdbRating-a.imdbRating);
        ShowAnswer(sortArray);
    }
}

function Task4(){
    let condition ="Создать новый массив, где объекты фильмов будут состоять из следующих полей:\n" +
        "id, title, released, plot";
    if (CheckIsArray(sourceArray))
    {
        ShowCondition(condition);
        let result = sourceArray.map((item)=>{
            return { id: item.id, title: item.title, released:item.released, plot: item.plot};
        });
        ShowAnswer(result);
    }
}

function Task5(){
    let condition ="Создать функцию, которая бы принимала массив фильмов и\n" +
        "число. А результатом этой функции должен быть\n" +
        "отфильтрованный массив, с фильмами где число равно году\n" +
        "выхода фильма.";
    if (CheckIsArray(sourceArray))
    {
        ShowCondition(condition);
        ShowAdditional("Введите год выпуска фильма:");
        document.getElementById("result").addEventListener("click", FuncToTask5);
    }
}

function Task6(){
    let condition ="Создать функцию, которая бы принимала массив фильмов и\n" +
        "строку. А результатом этой функции должен быть новый\n" +
        "отфильтрованный массив, с фильмами, где строка входит в\n" +
        "название фильма.";
    if (CheckIsArray(sourceArray))
    {
        ShowCondition(condition);
        let addBlock = document.getElementById("additional");
        if (addBlock)
        {
            addBlock.hidden=false;
            document.getElementById("info").textContent = "Введите название фильма:";
            document.getElementById("result").addEventListener("click", FuncToTask6);
        }
    }
}

function Task7(){
    let condition ="Создать функцию, которая бы принимала массив фильмов и\n" +
        "строку. А результатом этой функции должен быть\n" +
        "отфильтрованный массив, с фильмами где строка входит в\n" +
        "название фильма или в его сюжет.";
    if (CheckIsArray(sourceArray))
    {
        ShowCondition(condition);
        ShowAdditional("Введите название фильма или его сюжет:");
        document.getElementById("result").addEventListener("click", FuncToTask7);
    }
}

function Task8(){
    let condition ="Создать функцию, которая бы принимала 3 параметра:\n" +
        "1)массив фильмов , 2) строка(название поля, например 'title') и\n" +
        "строку/число(значение поля \"Black Widow\"). А результатом\n" +
        "этой функции должен быть отфильтрованный массив, где\n" +
        "параметры 2 и 3 равны в объекте фильма. Например:\n" +
        "передаем (films, 'title', 'Black Widow') и на выходе получаем\n" +
        "фильм с id=1 если передаем (films, 'year', 2011) , то получаем\n" +
        "фильм с id=2";
    if (CheckIsArray(sourceArray))
    {
        ShowCondition(condition);
        ShowAdditional("Введите название поля, например 'title'");
        ShowAdditional2("Введите значение поля");
        document.getElementById("result").addEventListener("click", FuncToTask8);
    }
}

function FilterByYear(arr,year){
    return arr.filter(s=>s.year === year);
}

function FilterByName(arr,name){
    return arr.filter(function(el){
        return el.title.toLowerCase().indexOf(name.toLowerCase())>-1;
    });
}

function FilterByNameOrPlot(arr,name){
    return arr.filter(function(el){
        return el.title.toLowerCase().indexOf(name.toLowerCase())>-1 || el.plot.toLowerCase().indexOf(name.toLowerCase())>-1;
    });
}

function FilterByAnyField(arr,fieldName,value){
    return arr.filter(x=>String(x[fieldName]) === value);
}














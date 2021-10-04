function foo(users){
    //creating a table head
    var tablediv = document.createElement("div");
  var table = document.createElement("table");
  var thead = document.createElement("thead");
  var tr = document.createElement("tr");
  var th1 = document.createElement("th");
  var th2 = document.createElement("th");
  th1.innerHTML="NAME";
  th2.innerHTML="EMAIL";
  tr.append(th1,th2);
  thead.append(tr);
  
  //filling table data for the respective button
  
  var tbody = document.createElement("tbody");
          users.forEach(el => {
            var tr1 = document.createElement("tr");
              var td1= document.createElement("td");
              td1.innerText=el.name;
              var td2= document.createElement("td");
              td2.innerText=el.email;
              tr1.append(td1,td2);
              tbody.append(tr1);
            
          });
              
         //appending table    
      
      table.append(thead,tbody);
      tablediv.append(table);
      document.body.append(tablediv);
    }
    
  
  
  //fetching data from api
    async function getUsers() {
      const data = await fetch(
        "https://gist.githubusercontent.com/rvsp/add40254aa126f045837fa5b51f47f1f/raw/4d724bfabf4cce7379a386e23bef6576ab99a2f9/pagination.json",
        {
          method: "GET"
        }
      );
      const users = await data.json();
      const firstTenUsers = users.slice(0, 10);
      foo(firstTenUsers);
      //creating pages depending on amount of data available
      const noOfPages = Math.ceil(users.length / 10);
      const div = document.createElement("div");
      div.setAttribute("class","pagination")
       
      
      //creating buttons depending on amount of pages
      for (let i = 0; i <= noOfPages; i++) {
        const page = document.createElement("a");
        if(i==0){page.innerText = "first";
        page.setAttribute("class","active");
      page.onclick = function (){
        document.querySelector(".active").removeAttribute("class")
      page.setAttribute("class","active");
      document.querySelector("table").remove();  //removes existing table
      foo(firstTenUsers);}
      }
        else {page.innerText = i;}
        if(i==1){
          
      page.innerText = "prev"
      page.onclick=function (){
        let j = localStorage.getItem("currentbutton");
       if(j<2 || document.querySelector(".active").innerText=="first"){return}
       const activeindex = document.querySelector(".active").innerText;
        document.querySelector(".active").removeAttribute("class")
        if(activeindex>1){
        const previndex = document.querySelectorAll("a")[activeindex-1]
          previndex.setAttribute("class","active")}
        
      
       const prevUsers = users.filter((user, index) =>filterUsers(index, (j - 10), j) );
    
          document.querySelector("table").remove();  //removes existing table
          foo(prevUsers);   //this function creates table and fills the data we selected
        };
        }
        if(i>1) {
          page.onclick = function () {
            document.querySelector(".active").removeAttribute("class")
            page.setAttribute("class","active")
            const pageUsers = users.filter((user, index) =>filterUsers(index, (i - 1) * 10, i * 10)  //filters the required data for the selected button
          );
      
            document.querySelector("table").remove();  //removes existing table
            foo(pageUsers);   //this function creates table and fills the data we selected
          };
  
        }
        //event handler, when a button is clicked
        
        div.append(page);
      }
    
      document.body.append(div);
          }
    
    function filterUsers(index, startIdx, endIdx) {
      localStorage.setItem("currentbutton",startIdx)//filters the required data for the selected button
      return index >= startIdx && index < endIdx;
    }
  
  

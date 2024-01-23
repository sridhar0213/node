



async function api() {
    const response = await fetch("https://node-9n0t.onrender.com/usersData");
    let data = await response.json();
    data = data.reverse()
    console.log(data);
    function Insert_Data() {
      document.getElementById("count").innerHTML= 'Total Records : '+data.length;
      var table = document.getElementById("datas");
      table.innerHTML="";
      var tr="";
      data.forEach((x,index)=>{
        let i=0;
         tr+='<tr>';
         tr+='<td style="padding-right: 30px;">'+(index+1)+'</td>'+'<td style="padding-right: 30px;">'+x.name+'</td>'+'<td style="padding-right: 30px;">'+x.phone+'</td>'+'<td style="padding-right: 10px">'+x.message+'</td>'+'<td>'+new Date(x.date).toLocaleString()+'</td>'
         tr+='</tr>'
         i=i+1
    
      })
      table.innerHTML+=tr;
    }
    Insert_Data()
  }
  api()
  
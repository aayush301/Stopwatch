var minutes=0,seconds=0,cs=0;   // 1 centisecond= one-hundredth of a second= 10 milliseconds
var lapCount=0;

function resume()
{
    time=setInterval(function() {
        cs++;
        if(cs==100)
        {
            cs=0;
            seconds++;
            if(seconds==60)
            {
                seconds=0;
                minutes++;
            }
        }
        document.getElementById('min').innerHTML=('0'+minutes).slice(-2);
        document.getElementById('sec').innerHTML=('0'+seconds).slice(-2);
        document.getElementById('cs').innerHTML=('0'+cs).slice(-2);
    }, 10);

    document.getElementById('pause-resume').setAttribute('onclick',"pause()");
    document.getElementById('pause-resume').innerHTML='Pause';
    document.querySelector('.afterButtons').style.display='block';
    document.querySelector('.initialButtons').style.display='none';
}


function pause()
{
    clearInterval(time);
    document.getElementById('pause-resume').setAttribute('onclick',"resume()");
    document.getElementById('pause-resume').innerHTML='Resume';
}


function reset() 
{
    clearInterval(time);
    minutes=seconds=cs=0;
    lapCount=0;

    document.getElementById('min').innerHTML='00';
    document.getElementById('sec').innerHTML='00';            
    document.getElementById('cs').innerHTML='00';            
    document.querySelector('.afterButtons').style.display='none';
    document.querySelector('.initialButtons').style.display='block';

    var lapTable=document.querySelector('table.lap');
    lapTable.style.display='none';
    for(let i=1;i<lapTable.rows.length;)
        lapTable.deleteRow(i);
}


function lap()
{
    lapCount++;
    var lapTable=document.querySelector('table.lap');
    lapTable.style.display='table';
    var row=lapTable.insertRow(1);
    
    var cell0=row.insertCell(0);
    cell0.innerHTML=lapCount;

    var cell1=row.insertCell(1);
    cell1.innerHTML=('0'+minutes).slice(-2)+':'+('0'+seconds).slice(-2)+'.'+('0'+cs).slice(-2);
    
    var cell2=row.insertCell(2);
    cell2.innerHTML='+'+diffTime();

}


function diffTime()
{
    const lapTable=document.querySelector('table.lap');
    if(lapTable.rows.length==2)
    {
        return ('0'+minutes).slice(-2)+':'+('0'+seconds).slice(-2)+'.'+('0'+cs).slice(-2);
    }
    let timeString=lapTable.rows.item(2).cells.item(1).innerHTML;
    
    const lastmin=Number(timeString.slice(0,2));
    const lastsec=Number(timeString.slice(3,5));
    const lastcs=Number(timeString.slice(6,8));

    let currmin=minutes,currsec=seconds,currcs=cs;    
    let diffmin=0,diffsec=0,diffcs=0;
    
    if(cs-lastcs>=0)
        diffcs=cs-lastcs;
    else
    {
        diffcs=cs-lastcs+100;
        currsec--;
    }

    if(currsec-lastsec>=0)
        diffsec=currsec-lastsec;
    else
    {
        diffsec=currsec-lastsec+60;
        currmin--;
    }

    diffmin=currmin-lastmin;

    return ('0'+diffmin).slice(-2)+':'+('0'+diffsec).slice(-2)+'.'+('0'+diffcs).slice(-2);
}

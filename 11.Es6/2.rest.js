function sample(name,...collection)
{
    let z = 0;
    for (let i in collection)
        {
            z+=collection[i];
        }
        console.log(name,z);
}

sample('anandh',20,30,50,60,800,100)
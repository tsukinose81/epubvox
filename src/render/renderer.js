let target;

const epubNameElm = document.getElementById("epubName");

const chooseEPUB = document.getElementById("chooseEPUB");
chooseEPUB.addEventListener("click", async (e) => {
  target = await mainWorld.chooseEPUB();
  epubNameElm.innerText = target.name;
});

const exec = document.getElementById("exec");
exec.addEventListener("click", async (e) => {
  console.log(await mainWorld.exec(target));
});

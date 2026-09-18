async page => {
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(await page.evaluate(() => location.origin));
 await page.getByRole('button',{name:/Visual recognition Picture/}).click();
 await page.getByRole('button',{name:/^Import Load/}).click();
 const question=(image,answer='Japan')=>({type:'picture_mcq',question:'Which country?',image,options:[answer,'Canada'],correctIndex:0,explanation:'Identify the country from its picture.'});
 const title='QA bundled flags '+Date.now();
 const pack={title,category:'flags',questions:[question({countryCode:'JP'}),question({countryCode:'SE'},'Sweden')]};
 await page.getByRole('textbox',{name:'Picture quiz JSON'}).fill(JSON.stringify(pack));
 await page.getByRole('button',{name:'Import & review pictures'}).click();
 await page.getByText(/2 \/ 2 pictures ready/).waitFor();
 if(!await page.getByRole('button',{name:'Save & play'}).isDisabled())throw Error('Review confirmation missing');
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:'output/playwright/picture-review-mobile.png',fullPage:true});
 await page.getByLabel('Country picture 1').selectOption('br');await page.getByRole('alert').waitFor();
 if(!await page.getByLabel('I checked that every picture matches its answer').isDisabled())throw Error('Mismatch allowed');
 await page.getByLabel('Country picture 1').selectOption('jp');await page.getByText(/2 \/ 2 pictures ready/).waitFor();
 await page.getByLabel('I checked that every picture matches its answer').check();
 const download=page.waitForEvent('download');await page.getByRole('button',{name:'Download project + pictures'}).click();await(await download).saveAs('output/playwright/bundled-flags-project.json');
 await page.getByRole('button',{name:'Save & play'}).click();await page.getByRole('button',{name:'A Japan',exact:true}).waitFor();
 await page.context().setOffline(true);
 try {await page.getByRole('button',{name:'A Japan',exact:true}).click();await page.getByRole('button',{name:'Next picture'}).click();await page.getByRole('button',{name:'A Sweden',exact:true}).click();await page.getByRole('button',{name:'See score'}).click();await page.getByRole('heading',{name:'You scored 2 / 2'}).waitFor();}finally{await page.context().setOffline(false);}
 await page.reload();await page.getByRole('button',{name:/Visual recognition Picture/}).click();await page.getByRole('button',{name:/^Library Browse/}).click();await page.getByRole('button',{name:new RegExp(title)}).click();await page.getByText(/2 \/ 2 pictures ready/).waitFor();
 if(await page.locator('.picture-review img').evaluateAll(images=>images.some(img=>!img.src.startsWith('data:image/')||!img.naturalWidth)))throw Error('Saved images not embedded');
 await page.getByRole('button',{name:'Home',exact:true}).click();await page.getByRole('button',{name:/^Library Browse/}).click();await page.getByRole('button',{name:/Country Shapes Starter Sample/}).click();await page.getByText(/3 \/ 3 pictures ready/).waitFor();
 await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:'output/playwright/shapes-review-desktop.png',fullPage:true});
 await page.getByRole('button',{name:'Home',exact:true}).click();await page.getByRole('button',{name:/^Import Load/}).click();
 await page.route('https://missing.invalid/**',route=>route.abort());
 await page.getByRole('textbox',{name:'Picture quiz JSON'}).fill(JSON.stringify({title:'QA repair images',category:'objects',questions:[question({src:'https://missing.invalid/broken.png',searchHint:'A red apple'},'Apple'),question({searchHint:'A tree'},'Tree')]}));
 await page.getByRole('button',{name:'Import & review pictures'}).click();await page.getByText('Picture needs replacement',{exact:true}).first().waitFor();
 await page.getByLabel('Replace picture 1').setInputFiles('public/picture-assets/flags/jp.png');
 await page.getByLabel('Replace picture 2').setInputFiles('public/picture-assets/silhouettes/br.png');
 await page.getByText(/2 \/ 2 pictures ready/).waitFor();
 await page.getByLabel('I checked that every picture matches its answer').check();await page.getByRole('button',{name:'Save draft',exact:true}).click();await page.getByText('Saved with pictures in this browser.').waitFor();
 if(errors.length)throw Error(errors.join(';'));

 await page.setViewportSize({width:320,height:740});
 if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1))throw Error('Review overflow');
 await page.getByLabel('Replace picture 1').setInputFiles('output/playwright/not-an-image.png');
 await page.getByText('Picture needs replacement',{exact:true}).waitFor();
 if(!await page.getByRole('button',{name:'Save & play'}).isDisabled())throw Error('Corrupt image allowed');
 await page.getByLabel('Replace picture 1').setInputFiles('public/picture-assets/flags/jp.png');
 await page.getByText(/2 \/ 2 pictures ready/).waitFor();await page.getByLabel('I checked that every picture matches its answer').check();
 await page.evaluate(()=>{window.__originalPut=IDBObjectStore.prototype.put; IDBObjectStore.prototype.put=function(){throw new DOMException('Test quota failure','QuotaExceededError');};});
 try{await page.getByRole('button',{name:'Save draft',exact:true}).click();await page.getByText(/Could not save: browser storage/).waitFor();if(await page.getByRole('button',{name:'Download project + pictures'}).isDisabled())throw Error('No backup after save failure');}finally{await page.evaluate(()=>{IDBObjectStore.prototype.put=window.__originalPut;});}
 await page.getByRole('button',{name:'Home',exact:true}).click();await page.getByRole('button',{name:/^Import Load/}).click();
 await page.getByLabel('Select JSON + pictures').setInputFiles('output/playwright/bundled-flags-project.json');
 await page.getByRole('button',{name:'Import & review pictures'}).click();await page.getByText(/2 \/ 2 pictures ready/).waitFor();
 await page.getByRole('button',{name:'Home',exact:true}).click();await page.getByRole('button',{name:/^Library Browse/}).click();await page.getByRole('button',{name:/Country Shapes Starter Sample/}).click();await page.getByText(/3 \/ 3 pictures ready/).waitFor();
 await page.getByLabel('I checked that every picture matches its answer').check();await page.getByRole('button',{name:'Save & play'}).click();
 await page.getByRole('button',{name:'A Italy',exact:true}).waitFor();await page.screenshot({path:'output/playwright/shape-player-mobile.png',fullPage:true});
 if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1))throw Error('Shape player overflow');
 await page.getByRole('button',{name:'A Italy',exact:true}).click();await page.getByRole('button',{name:'Next picture'}).click();await page.getByRole('button',{name:'B Brazil',exact:true}).click();await page.getByRole('button',{name:'Next picture'}).click();await page.getByRole('button',{name:'C Japan',exact:true}).click();await page.getByRole('button',{name:'See score'}).click();await page.getByRole('heading',{name:'You scored 3 / 3'}).waitFor();
}

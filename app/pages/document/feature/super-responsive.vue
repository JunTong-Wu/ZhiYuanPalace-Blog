<template>
  <CommonMainSection>
    <div class="document-card">
      <div class="container github-markdown-body">
        <h2>超级响应式布局</h2>
        <h3>响应式布局的概念</h3>
        <p>
          响应式布局是指网页在不同的设备和屏幕尺寸下，能够自动调整布局和样式，以适应不同的用户需求。
        </p>
        <h3>传统前端响应式的问题</h3>
        <p>
          在传统的前端项目中，通过屏幕宽度的判断，在CSS中通过媒体查询，来实现不同的布局和样式。但是这种方式存在以下几个问题：
          <ol>
            <li>
              代码复杂，维护成本高。
            </li>
            <li>
              无法实现自适应布局。
            </li>
            <li>
              无法实现自适应字体大小。
            </li>
          </ol>
        </p>
        <h3>超级响应式的解决方案</h3>
        <p>在知鸢宫的响应式布局设计中，体验最好的做法是将响应式布局与自适应布局二者结合：<br />
          结合 TailWindCSS 用横竖屏媒体查询处理布局切换，以及一些必要断点处的字号数值的变化。<br />
          同一屏幕方向、同一断点区间内，单位使用 rem 和百分比。<br />
          除此之外，使用JavaScript，给根节点在相同断点区间、相同屏幕方向内设置线性根字号变化；<br />
          在不同的断点区间、不同的屏幕方向内，设置字号跳变。
        </p>
        <h3>超级响应式的优点</h3>
        <p>
          超级响应式的优点主要有以下几个方面：
          <ol>
            <li>
              代码简洁，维护成本低。
            </li>
            <li>
              可以实现自适应布局。
            </li>
            <li>
              可以实现自适应字体大小。
            </li>
          </ol>
          这套做法可以最灵活的满足包括手机横屏、pc竖屏等小众设计要求的方案，达到任何奇怪的屏幕尺寸都完美显示。
        </p>
        <h3>超级响应式的断点设计</h3>
        <p>
          超级响应式布局系统，共可以实现以下12种屏幕尺寸的分别精细化设计：
        </p>
        <table>
          <thead>
            <th>
              屏幕大小（可自定义响应点）
            </th>
            <th>
              屏幕方向
            </th>
            <th>
              说明
            </th>
            <th>
              默认设计稿尺寸（可自定义）
            </th>
            <th>
              TailWind CSS 断点前缀
            </th>
          </thead>
          <tbody>
            <tr>
              <td>
                &lt;600px
              </td>
              <td>
                portrait
              </td>
              <td>
                手机竖屏
              </td>
              <td>
                375px
              </td>
              <td>
                <code>portrait:</code>
              </td>
            </tr>
            <tr>
              <td>
                &lt;600px
              </td>
              <td>
                landscape
              </td>
              <td>
                手机横屏
              </td>
              <td>
                667px
              </td>
              <td>
                <code>landscape:</code>
              </td>
            </tr>
            <tr>
              <td>
                600px - 900px
              </td>
              <td>
                portrait
              </td>
              <td>
                小平板竖屏
              </td>
              <td>
                576px
              </td>
              <td>
                <code>portrait:xs:</code>
              </td>
            </tr>
            <tr>
              <td>
                600px - 900px
              </td>
              <td>
                landscape
              </td>
              <td>
                小平板横屏
              </td>
              <td>
                1024px
              </td>
              <td>
                <code>landscape:xs:</code>
              </td>
            </tr>
            <tr>
              <td>
                900px - 1200px
              </td>
              <td>
                portrait
              </td>
              <td>
                大平板竖屏
              </td>
              <td>
                720px
              </td>
              <td>
                <code>portrait:sm:</code>
              </td>
            </tr>
            <tr>
              <td>
                900px - 1200px
              </td>
              <td>
                landscape
              </td>
              <td>
                大平板横屏
              </td>
              <td>
                1280px
              </td>
              <td>
                <code>landscape:sm:</code>
              </td>
            </tr>
            <tr>
              <td>
                1200px - 1500px
              </td>
              <td>
                portrait
              </td>
              <td>
                小笔记本竖屏
              </td>
              <td>
                768px
              </td>
              <td>
                <code>portrait:md:</code>
              </td>
            </tr>
            <tr>
              <td>
                1200px - 1500px
              </td>
              <td>
                landscape
              </td>
              <td>
                小笔记本横屏
              </td>
              <td>
                1366px
              </td>
              <td>
                <code>landscape:md:</code>
              </td>
            </tr>
            <tr>
              <td>
                1500px - 1800px
              </td>
              <td>
                portrait
              </td>
              <td>
                大笔记本竖屏
              </td>
              <td>
                900px
              </td>
              <td>
                <code>portrait:lg:</code>
              </td>
            </tr>
            <tr>
              <td>
                1500px - 1800px
              </td>
              <td>
                landscape
              </td>
              <td>
                大笔记本横屏
              </td>
              <td>
                1600px
              </td>
              <td>
                <code>landscape:lg:</code>
              </td>
            </tr>
            <tr>
              <td>
                &gt;1800px
              </td>
              <td>
                portrait
              </td>
              <td>
                显示器竖屏
              </td>
              <td>
                1080px
              </td>
              <td>
                <code>portrait:xl:</code>
              </td>
            </tr>
            <tr>
              <td>
                &gt;1800px
              </td>
              <td>
                landscape
              </td>
              <td>
                显示器横屏
              </td>
              <td>
                1920px
              </td>
              <td>
                <code>landscape:xl:</code>
              </td>
            </tr>
          </tbody>
        </table>
        <br />

        <h3>JavaScipt自适应字号原理</h3>
        <p>
          对于两个断点之间的字号的线性变化，我们可以通过以下公式来计算：
          </p>
        <svg xmlns="http://www.w3.org/2000/svg" width="36.36ex" height="5.118ex" viewBox="0 -1370 16071 2262" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" style=""><defs><path id="MJX-5-TEX-N-72" d="M36 46H50Q89 46 97 60V68Q97 77 97 91T98 122T98 161T98 203Q98 234 98 269T98 328L97 351Q94 370 83 376T38 385H20V408Q20 431 22 431L32 432Q42 433 60 434T96 436Q112 437 131 438T160 441T171 442H174V373Q213 441 271 441H277Q322 441 343 419T364 373Q364 352 351 337T313 322Q288 322 276 338T263 372Q263 381 265 388T270 400T273 405Q271 407 250 401Q234 393 226 386Q179 341 179 207V154Q179 141 179 127T179 101T180 81T180 66V61Q181 59 183 57T188 54T193 51T200 49T207 48T216 47T225 47T235 46T245 46H276V0H267Q249 3 140 3Q37 3 28 0H20V46H36Z"></path><path id="MJX-5-TEX-N-65" d="M28 218Q28 273 48 318T98 391T163 433T229 448Q282 448 320 430T378 380T406 316T415 245Q415 238 408 231H126V216Q126 68 226 36Q246 30 270 30Q312 30 342 62Q359 79 369 104L379 128Q382 131 395 131H398Q415 131 415 121Q415 117 412 108Q393 53 349 21T250 -11Q155 -11 92 58T28 218ZM333 275Q322 403 238 411H236Q228 411 220 410T195 402T166 381T143 340T127 274V267H333V275Z"></path><path id="MJX-5-TEX-N-6D" d="M41 46H55Q94 46 102 60V68Q102 77 102 91T102 122T103 161T103 203Q103 234 103 269T102 328V351Q99 370 88 376T43 385H25V408Q25 431 27 431L37 432Q47 433 65 434T102 436Q119 437 138 438T167 441T178 442H181V402Q181 364 182 364T187 369T199 384T218 402T247 421T285 437Q305 442 336 442Q351 442 364 440T387 434T406 426T421 417T432 406T441 395T448 384T452 374T455 366L457 361L460 365Q463 369 466 373T475 384T488 397T503 410T523 422T546 432T572 439T603 442Q729 442 740 329Q741 322 741 190V104Q741 66 743 59T754 49Q775 46 803 46H819V0H811L788 1Q764 2 737 2T699 3Q596 3 587 0H579V46H595Q656 46 656 62Q657 64 657 200Q656 335 655 343Q649 371 635 385T611 402T585 404Q540 404 506 370Q479 343 472 315T464 232V168V108Q464 78 465 68T468 55T477 49Q498 46 526 46H542V0H534L510 1Q487 2 460 2T422 3Q319 3 310 0H302V46H318Q379 46 379 62Q380 64 380 200Q379 335 378 343Q372 371 358 385T334 402T308 404Q263 404 229 370Q202 343 195 315T187 232V168V108Q187 78 188 68T191 55T200 49Q221 46 249 46H265V0H257L234 1Q210 2 183 2T145 3Q42 3 33 0H25V46H41Z"></path><path id="MJX-5-TEX-N-3D" d="M56 347Q56 360 70 367H707Q722 359 722 347Q722 336 708 328L390 327H72Q56 332 56 347ZM56 153Q56 168 72 173H708Q722 163 722 153Q722 140 707 133H70Q56 140 56 153Z"></path><path id="MJX-5-TEX-N-66" d="M273 0Q255 3 146 3Q43 3 34 0H26V46H42Q70 46 91 49Q99 52 103 60Q104 62 104 224V385H33V431H104V497L105 564L107 574Q126 639 171 668T266 704Q267 704 275 704T289 705Q330 702 351 679T372 627Q372 604 358 590T321 576T284 590T270 627Q270 647 288 667H284Q280 668 273 668Q245 668 223 647T189 592Q183 572 182 497V431H293V385H185V225Q185 63 186 61T189 57T194 54T199 51T206 49T213 48T222 47T231 47T241 46T251 46H282V0H273Z"></path><path id="MJX-5-TEX-N-6F" d="M28 214Q28 309 93 378T250 448Q340 448 405 380T471 215Q471 120 407 55T250 -10Q153 -10 91 57T28 214ZM250 30Q372 30 372 193V225V250Q372 272 371 288T364 326T348 362T317 390T268 410Q263 411 252 411Q222 411 195 399Q152 377 139 338T126 246V226Q126 130 145 91Q177 30 250 30Z"></path><path id="MJX-5-TEX-N-6E" d="M41 46H55Q94 46 102 60V68Q102 77 102 91T102 122T103 161T103 203Q103 234 103 269T102 328V351Q99 370 88 376T43 385H25V408Q25 431 27 431L37 432Q47 433 65 434T102 436Q119 437 138 438T167 441T178 442H181V402Q181 364 182 364T187 369T199 384T218 402T247 421T285 437Q305 442 336 442Q450 438 463 329Q464 322 464 190V104Q464 66 466 59T477 49Q498 46 526 46H542V0H534L510 1Q487 2 460 2T422 3Q319 3 310 0H302V46H318Q379 46 379 62Q380 64 380 200Q379 335 378 343Q372 371 358 385T334 402T308 404Q263 404 229 370Q202 343 195 315T187 232V168V108Q187 78 188 68T191 55T200 49Q221 46 249 46H265V0H257L234 1Q210 2 183 2T145 3Q42 3 33 0H25V46H41Z"></path><path id="MJX-5-TEX-N-74" d="M27 422Q80 426 109 478T141 600V615H181V431H316V385H181V241Q182 116 182 100T189 68Q203 29 238 29Q282 29 292 100Q293 108 293 146V181H333V146V134Q333 57 291 17Q264 -10 221 -10Q187 -10 162 2T124 33T105 68T98 100Q97 107 97 248V385H18V422H27Z"></path><path id="MJX-5-TEX-N-53" d="M55 507Q55 590 112 647T243 704H257Q342 704 405 641L426 672Q431 679 436 687T446 700L449 704Q450 704 453 704T459 705H463Q466 705 472 699V462L466 456H448Q437 456 435 459T430 479Q413 605 329 646Q292 662 254 662Q201 662 168 626T135 542Q135 508 152 480T200 435Q210 431 286 412T370 389Q427 367 463 314T500 191Q500 110 448 45T301 -21Q245 -21 201 -4T140 27L122 41Q118 36 107 21T87 -7T78 -21Q76 -22 68 -22H64Q61 -22 55 -16V101Q55 220 56 222Q58 227 76 227H89Q95 221 95 214Q95 182 105 151T139 90T205 42T305 24Q352 24 386 62T420 155Q420 198 398 233T340 281Q284 295 266 300Q261 301 239 306T206 314T174 325T141 343T112 367T85 402Q55 451 55 507Z"></path><path id="MJX-5-TEX-N-69" d="M69 609Q69 637 87 653T131 669Q154 667 171 652T188 609Q188 579 171 564T129 549Q104 549 87 564T69 609ZM247 0Q232 3 143 3Q132 3 106 3T56 1L34 0H26V46H42Q70 46 91 49Q100 53 102 60T104 102V205V293Q104 345 102 359T88 378Q74 385 41 385H30V408Q30 431 32 431L42 432Q52 433 70 434T106 436Q123 437 142 438T171 441T182 442H185V62Q190 52 197 50T232 46H255V0H247Z"></path><path id="MJX-5-TEX-N-7A" d="M42 263Q44 270 48 345T53 423V431H393Q399 425 399 415Q399 403 398 402L381 378Q364 355 331 309T265 220L134 41L182 40H206Q254 40 283 46T331 77Q352 105 359 185L361 201Q361 202 381 202H401V196Q401 195 393 103T384 6V0H209L34 1L31 3Q28 8 28 17Q28 30 29 31T160 210T294 394H236Q169 393 152 388Q127 382 113 367Q89 344 82 264V255H42V263Z"></path><path id="MJX-5-TEX-N-D7" d="M630 29Q630 9 609 9Q604 9 587 25T493 118L389 222L284 117Q178 13 175 11Q171 9 168 9Q160 9 154 15T147 29Q147 36 161 51T255 146L359 250L255 354Q174 435 161 449T147 471Q147 480 153 485T168 490Q173 490 175 489Q178 487 284 383L389 278L493 382Q570 459 587 475T609 491Q630 491 630 471Q630 464 620 453T522 355L418 250L522 145Q606 61 618 48T630 29Z"></path><path id="MJX-5-TEX-N-64" d="M376 495Q376 511 376 535T377 568Q377 613 367 624T316 637H298V660Q298 683 300 683L310 684Q320 685 339 686T376 688Q393 689 413 690T443 693T454 694H457V390Q457 84 458 81Q461 61 472 55T517 46H535V0Q533 0 459 -5T380 -11H373V44L365 37Q307 -11 235 -11Q158 -11 96 50T34 215Q34 315 97 378T244 442Q319 442 376 393V495ZM373 342Q328 405 260 405Q211 405 173 369Q146 341 139 305T131 211Q131 155 138 120T173 59Q203 26 251 26Q322 26 373 103V342Z"></path><path id="MJX-5-TEX-N-63" d="M370 305T349 305T313 320T297 358Q297 381 312 396Q317 401 317 402T307 404Q281 408 258 408Q209 408 178 376Q131 329 131 219Q131 137 162 90Q203 29 272 29Q313 29 338 55T374 117Q376 125 379 127T395 129H409Q415 123 415 120Q415 116 411 104T395 71T366 33T318 2T249 -11Q163 -11 99 53T34 214Q34 318 99 383T250 448T370 421T404 357Q404 334 387 320Z"></path><path id="MJX-5-TEX-N-45" d="M128 619Q121 626 117 628T101 631T58 634H25V680H597V676Q599 670 611 560T625 444V440H585V444Q584 447 582 465Q578 500 570 526T553 571T528 601T498 619T457 629T411 633T353 634Q266 634 251 633T233 622Q233 622 233 621Q232 619 232 497V376H286Q359 378 377 385Q413 401 416 469Q416 471 416 473V493H456V213H416V233Q415 268 408 288T383 317T349 328T297 330Q290 330 286 330H232V196V114Q232 57 237 52Q243 47 289 47H340H391Q428 47 452 50T505 62T552 92T584 146Q594 172 599 200T607 247T612 270V273H652V270Q651 267 632 137T610 3V0H25V46H58Q100 47 109 49T128 61V619Z"></path><path id="MJX-5-TEX-N-6C" d="M42 46H56Q95 46 103 60V68Q103 77 103 91T103 124T104 167T104 217T104 272T104 329Q104 366 104 407T104 482T104 542T103 586T103 603Q100 622 89 628T44 637H26V660Q26 683 28 683L38 684Q48 685 67 686T104 688Q121 689 141 690T171 693T182 694H185V379Q185 62 186 60Q190 52 198 49Q219 46 247 46H263V0H255L232 1Q209 2 183 2T145 3T107 3T57 1L34 0H26V46H42Z"></path><path id="MJX-5-TEX-N-2E" d="M78 60Q78 84 95 102T138 120Q162 120 180 104T199 61Q199 36 182 18T139 0T96 17T78 60Z"></path><path id="MJX-5-TEX-N-57" d="M792 683Q810 680 914 680Q991 680 1003 683H1009V637H996Q931 633 915 598Q912 591 863 438T766 135T716 -17Q711 -22 694 -22Q676 -22 673 -15Q671 -13 593 231L514 477L435 234Q416 174 391 92T358 -6T341 -22H331Q314 -21 310 -15Q309 -14 208 302T104 622Q98 632 87 633Q73 637 35 637H18V683H27Q69 681 154 681Q164 681 181 681T216 681T249 682T276 683H287H298V637H285Q213 637 213 620Q213 616 289 381L364 144L427 339Q490 535 492 546Q487 560 482 578T475 602T468 618T461 628T449 633T433 636T408 637H380V683H388Q397 680 508 680Q629 680 650 683H660V637H647Q576 637 576 619L727 146Q869 580 869 600Q869 605 863 612T839 627T794 637H783V683H792Z"></path><path id="MJX-5-TEX-N-68" d="M41 46H55Q94 46 102 60V68Q102 77 102 91T102 124T102 167T103 217T103 272T103 329Q103 366 103 407T103 482T102 542T102 586T102 603Q99 622 88 628T43 637H25V660Q25 683 27 683L37 684Q47 685 66 686T103 688Q120 689 140 690T170 693T181 694H184V367Q244 442 328 442Q451 442 463 329Q464 322 464 190V104Q464 66 466 59T477 49Q498 46 526 46H542V0H534L510 1Q487 2 460 2T422 3Q319 3 310 0H302V46H318Q379 46 379 62Q380 64 380 200Q379 335 378 343Q372 371 358 385T334 402T308 404Q263 404 229 370Q202 343 195 315T187 232V168V108Q187 78 188 68T191 55T200 49Q221 46 249 46H265V0H257L234 1Q210 2 183 2T145 3Q42 3 33 0H25V46H41Z"></path><path id="MJX-5-TEX-N-73" d="M295 316Q295 356 268 385T190 414Q154 414 128 401Q98 382 98 349Q97 344 98 336T114 312T157 287Q175 282 201 278T245 269T277 256Q294 248 310 236T342 195T359 133Q359 71 321 31T198 -10H190Q138 -10 94 26L86 19L77 10Q71 4 65 -1L54 -11H46H42Q39 -11 33 -5V74V132Q33 153 35 157T45 162H54Q66 162 70 158T75 146T82 119T101 77Q136 26 198 26Q295 26 295 104Q295 133 277 151Q257 175 194 187T111 210Q75 227 54 256T33 318Q33 357 50 384T93 424T143 442T187 447H198Q238 447 268 432L283 424L292 431Q302 440 314 448H322H326Q329 448 335 442V310L329 304H301Q295 310 295 316Z"></path><path id="MJX-5-TEX-N-67" d="M329 409Q373 453 429 453Q459 453 472 434T485 396Q485 382 476 371T449 360Q416 360 412 390Q410 404 415 411Q415 412 416 414V415Q388 412 363 393Q355 388 355 386Q355 385 359 381T368 369T379 351T388 325T392 292Q392 230 343 187T222 143Q172 143 123 171Q112 153 112 133Q112 98 138 81Q147 75 155 75T227 73Q311 72 335 67Q396 58 431 26Q470 -13 470 -72Q470 -139 392 -175Q332 -206 250 -206Q167 -206 107 -175Q29 -140 29 -75Q29 -39 50 -15T92 18L103 24Q67 55 67 108Q67 155 96 193Q52 237 52 292Q52 355 102 398T223 442Q274 442 318 416L329 409ZM299 343Q294 371 273 387T221 404Q192 404 171 388T145 343Q142 326 142 292Q142 248 149 227T179 192Q196 182 222 182Q244 182 260 189T283 207T294 227T299 242Q302 258 302 292T299 343ZM403 -75Q403 -50 389 -34T348 -11T299 -2T245 0H218Q151 0 138 -6Q118 -15 107 -34T95 -74Q95 -84 101 -97T122 -127T170 -155T250 -167Q319 -167 361 -139T403 -75Z"></path></defs><g stroke="currentColor" fill="currentColor" stroke-width="0" transform="matrix(1 0 0 -1 0 0)"><g data-mml-node="math"><g data-mml-node="mtext"><use xlink:href="#MJX-5-TEX-N-72"></use><use xlink:href="#MJX-5-TEX-N-65" transform="translate(392, 0)"></use><use xlink:href="#MJX-5-TEX-N-6D" transform="translate(836, 0)"></use></g><g data-mml-node="mo" transform="translate(1946.8, 0)"><use xlink:href="#MJX-5-TEX-N-3D"></use></g><g data-mml-node="mtext" transform="translate(3002.6, 0)"><use xlink:href="#MJX-5-TEX-N-66"></use><use xlink:href="#MJX-5-TEX-N-6F" transform="translate(306, 0)"></use><use xlink:href="#MJX-5-TEX-N-6E" transform="translate(806, 0)"></use><use xlink:href="#MJX-5-TEX-N-74" transform="translate(1362, 0)"></use><use xlink:href="#MJX-5-TEX-N-53" transform="translate(1751, 0)"></use><use xlink:href="#MJX-5-TEX-N-69" transform="translate(2307, 0)"></use><use xlink:href="#MJX-5-TEX-N-7A" transform="translate(2585, 0)"></use><use xlink:href="#MJX-5-TEX-N-65" transform="translate(3029, 0)"></use></g><g data-mml-node="mo" transform="translate(6697.8, 0)"><use xlink:href="#MJX-5-TEX-N-D7"></use></g><g data-mml-node="mfrac" transform="translate(7698, 0)"><g data-mml-node="mtext" transform="translate(220, 676)"><use xlink:href="#MJX-5-TEX-N-64"></use><use xlink:href="#MJX-5-TEX-N-6F" transform="translate(556, 0)"></use><use xlink:href="#MJX-5-TEX-N-63" transform="translate(1056, 0)"></use><use xlink:href="#MJX-5-TEX-N-45" transform="translate(1500, 0)"></use><use xlink:href="#MJX-5-TEX-N-6C" transform="translate(2181, 0)"></use><use xlink:href="#MJX-5-TEX-N-2E" transform="translate(2459, 0)"></use><use xlink:href="#MJX-5-TEX-N-63" transform="translate(2737, 0)"></use><use xlink:href="#MJX-5-TEX-N-6C" transform="translate(3181, 0)"></use><use xlink:href="#MJX-5-TEX-N-69" transform="translate(3459, 0)"></use><use xlink:href="#MJX-5-TEX-N-65" transform="translate(3737, 0)"></use><use xlink:href="#MJX-5-TEX-N-6E" transform="translate(4181, 0)"></use><use xlink:href="#MJX-5-TEX-N-74" transform="translate(4737, 0)"></use><use xlink:href="#MJX-5-TEX-N-57" transform="translate(5126, 0)"></use><use xlink:href="#MJX-5-TEX-N-69" transform="translate(6154, 0)"></use><use xlink:href="#MJX-5-TEX-N-64" transform="translate(6432, 0)"></use><use xlink:href="#MJX-5-TEX-N-74" transform="translate(6988, 0)"></use><use xlink:href="#MJX-5-TEX-N-68" transform="translate(7377, 0)"></use></g><g data-mml-node="mtext" transform="translate(1961.5, -686)"><use xlink:href="#MJX-5-TEX-N-64"></use><use xlink:href="#MJX-5-TEX-N-65" transform="translate(556, 0)"></use><use xlink:href="#MJX-5-TEX-N-73" transform="translate(1000, 0)"></use><use xlink:href="#MJX-5-TEX-N-69" transform="translate(1394, 0)"></use><use xlink:href="#MJX-5-TEX-N-67" transform="translate(1672, 0)"></use><use xlink:href="#MJX-5-TEX-N-6E" transform="translate(2172, 0)"></use><use xlink:href="#MJX-5-TEX-N-53" transform="translate(2728, 0)"></use><use xlink:href="#MJX-5-TEX-N-69" transform="translate(3284, 0)"></use><use xlink:href="#MJX-5-TEX-N-7A" transform="translate(3562, 0)"></use><use xlink:href="#MJX-5-TEX-N-65" transform="translate(4006, 0)"></use></g><rect width="8133" height="60" x="120" y="220"></rect></g></g></g></svg>

        <br />
        <!-- 公式原理详细介绍 -->
        <p>此公式的主要目标是根据当前浏览器窗口的宽度（<code>docEl.clientWidth</code>），结合设计稿的尺寸（<code>designSize</code>）和基础字体大小（<code>fontSize</code>），动态地计算出 HTML 根元素（<code>&lt;html&gt;</code>）的字体大小（<code>rem</code>），从而实现页面的响应式布局。</p>
        <h4>公式各部分含义</h4>
        <ol>
          <li><strong><code>fontSize</code></strong>：这是基础字体大小，它是一个固定的值，存储在 <code>window.ZyFontSize</code> 中。在响应式布局中，它作为计算的基础，所有后续的字体大小调整都是基于这个基础值进行的。</li>
          <li><strong><code>docEl.clientWidth</code></strong>：表示当前 HTML 文档根元素（<code>&lt;html&gt;</code>）的可视宽度，即浏览器窗口的宽度。这个值会随着用户调整浏览器窗口大小而动态变化。</li>
          <li><strong><code>designSize</code></strong>：它是根据当前窗口宽度和屏幕方向从 <code>window.ZyDesignSize</code> 中选取的一个合适的设计稿尺寸。不同的窗口宽度范围和屏幕方向对应不同的设计稿尺寸，例如手机竖屏、横屏，平板竖屏、横屏等。</li>
        </ol>
        <h4>公式计算过程</h4>
        <ol>
          <li><strong>计算比例</strong>：首先计算 <code>docEl.clientWidth</code> 与 <code>designSize</code> 的比值，即 <code>docEl.clientWidth / designSize</code>。这个比值表示当前窗口宽度相对于设计稿尺寸的比例。例如，如果设计稿宽度为 375px，而当前窗口宽度为 750px，那么这个比值就是 2，表示当前窗口宽度是设计稿宽度的 2 倍。</li>
          <li><strong>计算 <code>rem</code> 值</strong>：将基础字体大小 <code>fontSize</code> 乘以这个比例，得到最终的 <code>rem</code> 值。这样，<code>rem</code> 值就会随着窗口宽度的变化而动态调整。例如，如果基础字体大小为 16px，当前窗口宽度是设计稿宽度的 2 倍，那么计算得到的 <code>rem</code> 值就是 <code>16 × 2 = 32</code>px。</li>
          <li><strong>设置根元素字体大小</strong>：最后将计算得到的 <code>rem</code> 值加上 <code>px</code> 单位，并设置为 HTML 根元素的字体大小。由于页面中的其他元素可以使用 <code>rem</code> 作为单位来设置字体大小和其他尺寸，因此当根元素的字体大小改变时，整个页面的布局会自动进行响应式调整。</li>
        </ol>
        <p>通过这个公式，页面可以根据不同的屏幕尺寸和方向，动态地调整根元素的字体大小，从而实现响应式布局，确保页面在各种设备上都能有良好的显示效果。</p>

        <h3>技术细节</h3>
        <p>
          在项目开发时，可以结合 Tailwind CSS 的 <code>responsive modifiers</code> 响应修饰符特性，结合 <code>rem</code> 单位，实现页面的响应式布局。<br />
          例如一个完整的文章列表的 Grid 布局，具体的 Tailwind ClassName 实现方式如下：<br />
        </p>
        <pre><code class="language-css">.row-article {
  @apply grid grid-cols-12 portrait:gap-0 portrait:xs:gap-4 gap-4 xs:gap-4 sm:gap-4 md:gap-5 lg:gap-6;
}
.clo-article-card {
  @apply portrait:col-span-12 landscape:col-span-12
          portrait:xs:col-span-12 landscape:xs:col-span-6
          portrait:sm:col-span-6 landscape:sm:col-span-6
          portrait:md:col-span-6 landscape:md:col-span-6
          portrait:lg:col-span-6 landscape:lg:col-span-6
          portrait:xl:col-span-6 landscape:xl:col-span-6;
}</code></pre><br/>
        <p>像这样结合使用 <code>portrait:</code> 方向断点前缀和 <code>xs:</code> 宽度断点前缀，即可分别设置12种屏的样式。</p>
        <p>而对于自适应字号，知鸢宫的超级响应式组件 <code>ZySuperResponsive</code> ，已经自动处理了通过 JavaScipt 实现动态 HTML 根元素字号大小的设计。只需要开发者编写CSS样式时使用 <code>rem</code> 单位，或者直接使用 TailWind CSS 。因为它默认就是采用的 <code>rem</code> 单位。</p>
        <P><code>ZySuperResponsive</code> 组件中，自适应字号的核心代码：</P>
        <pre><code class="language-typescript">const isVertical = () => {
  const mql = window.matchMedia("(orientation: portrait)");
  return mql.matches;
};

const fontSizeInit = () => {
  const docEl = document.documentElement;
  const fontSize = window.ZyFontSize;
  const breakPoints = window.ZyBreakPoints;
  const designSize = window.ZyDesignSize;

  if (docEl) {
    const width = docEl.clientWidth;
    const isVert = isVertical();

    // 定义尺寸映射对象
    const sizeMap = {
      xs: isVert ? designSize.min_xs_v : designSize.min_xs_h,
      sm: isVert ? designSize.xs_sm_v : designSize.xs_sm_h,
      md: isVert ? designSize.sm_md_v : designSize.sm_md_h,
      lg: isVert ? designSize.md_lg_v : designSize.md_lg_h,
      xl: isVert ? designSize.lg_xl_v : designSize.lg_xl_h,
      max: isVert ? designSize.xl_max_v : designSize.xl_max_h,
    };

    let rem;
    if (width <= breakPoints.xs) {
      rem = fontSize * (width / sizeMap.xs);
    } else if (width <= breakPoints.sm) {
      rem = fontSize * (width / sizeMap.sm);
    } else if (width <= breakPoints.md) {
      rem = fontSize * (width / sizeMap.md);
    } else if (width <= breakPoints.lg) {
      rem = fontSize * (width / sizeMap.lg);
    } else if (width <= breakPoints.xl) {
      rem = fontSize * (width / sizeMap.xl);
    } else {
      rem = fontSize * (width / sizeMap.max);
    }

    docEl.style.fontSize = rem + "px";
  }
};</code></pre><br />

        <h3>兼容 SSR 服务端渲染的实现方法</h3>
        <p>
          该核心方法中使用了 <code>document</code> 对象，在 SSR 服务端渲染时不存在 <code>document</code> 对象，因此需要通过一些方法使其只在客户端运行。
        </p>
        <p>
          为了在页面元素及其他页面样式加载之前，就提前自动初始化该样式，并且兼容 SSR 服务端渲染，<code>ZySuperResponsive</code> 组件在服务端渲染时，通过 NUXT3 的 <code>useHead()</code> 方法，在 html 头部插入标签，包括 <code>window.ZyFontSize</code> 和 <code>window.ZyDesignSize</code> 等全局变量，以及一些需要客户端优先加载的样式类脚本，来动态设置 HTML 根元素的字体大小。<br />
          具体的实现方法如下：<br />
        </p>
        <pre><code class="language-typescript">useHead({
  script: [
    {
      innerHTML: \`
      window.ZyFontSize = \${props.baseFontSize};
      window.ZyBreakPoints = \${JSON.stringify(props.breakPoints)};
      window.ZyDesignSize = \${JSON.stringify(props.designSize)}
    \`,
    },
    {
      innerHTML: \`\${initZySuperResponsive.toString()};initZySuperResponsive();\`,
    },
  ],
})</code></pre><br />
        <p>该标签在浏览器环境会被同步加载，且在 Node.js 环境不会运行。</p>
      </div>
    </div>
  </CommonMainSection>
</template>
<script setup lang="ts">
  import Prism from "prismjs";
  onMounted(() => {
    Prism.highlightAll();
  });
  onUpdated(() => {
    Prism.highlightAll();
  });
</script>
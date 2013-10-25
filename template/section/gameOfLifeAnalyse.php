<article>
	<a href='index.php?tuto=gameOfLifeAnalyse'><h2>Analysis and tutorial for Game of Life</h2></a>



	<!-- définition d'une zone de thumbnail pour nos articles -->
	<div id='thumbnail'></div>

	<div id='contenu'>
		<h3>Tutorial</h3>
		<p>If you want to use the Game of Life application, you have just to choose it in the project menu's section. Once
			you did it, you will be redirect on the application. The first part of the page is facultative content : a short historical
			abstract about Conway's game of life, presentation of the rules use in the generation algorithm and some theorical explanantion
			about utility of this game in the Sciences world. You could hidde these 3 menu only with a click on the black arrow and reveal
			them with a click on the title.
		</p>
		<p>Then you arrive on the core of the application. <img src='./images/tuto/menutop.png' alt='image menu'/></p>
		<p>This menu will help you to
			initialize your pattern. Draw options : </p>
			<ul>
				<li>The mode button allows you to choose your generation algorithm : classic (Conway's algorithm B3S23), HighLife (B36S23) and B1S12 (interesting for symetrical generation).</li>
				<li>The random button allows you to create a random pattern where you can choose proportion of living cells and proportion of each phenotypes.</li>
				<li>The clear button allows you to erase the draw area.</li>
				<li>The load button allows you to automatically draw the pattern you have put in storage.</li>
				<li>You are able to use these buttons only when the pattern generation is on pause.</li>
			</ul>
		<p>Beneath this section you will find the pattern initialization section wich has 2 parts. A drawing interface and a control bar. <img src='./images/tuto/draw.png' alt='drawing section'/></p>
		<p> In this area you can draw and modify your pattern. The process is quite simple, you can determine a cell's live state and phenotype with a click. A white space is a dead cell, on the first click it
			will become a phenotype 1 (light) living cell, the next click will switch it to phenotype 2. If you click once more the cell will die. <img src='./images/tuto/controls.png' alt='controls'/></p>
		<p>Controls options are separate in two sub-menu save and generation :</p>
			<ul>
				<li>The update button allows you to display the current generation pattern in draw area and then eventually modify it and restart the generation with some changes.</li>
				<li>The save button allows you to store the pattern in the draw area in the localStorage of your internet navigator and eventually reuse it in the future. But you can only
					have one pattern in memory and the memory is erase each time you close your navigator.</li>
				<li>The number of iterations indicator shows you the generation algorithm's number of run.</li>
				<li>The go to button allows you to let the algorithm run and stop to display only the iteration you ask for.</li>
				<li>The auto button allows you to let the generation algorithm to run automatically at a speed you can determine.</li>
				<li>The next generation button will use the generation algorithm on the current pattern only one time.</li>
				<li>The restart button will use the initial pattern instead of the current pattern as reference for the next iteration.</li>
			</ul>
		<p>Finally the last area of the application is the generation pattern display area. This webGl render area will show you the evolution of your draw : live, death, grow, propagation and more. 
			<img src='./images/tuto/display.png'/></p>
		<p> On the bottom-left you will find a hover displaying menu with some controls options menu wich will allow you to manage your generation without loosing monitoring
			on the pattern generation. You can even choose to switch the generation algorithm while the generation is running.
		</p>

		<div id='zoneGraph'>
			<h3>Execution's speed related to grid's dimensions graph</h3>
			<ul>
				<li>abscissa : grid dimension (nb box)</li>
				<li>ordinate : execution time (ms)</li>
				<li>light <img src='./images/phen1.png'/>: grid algorithm execution</li>
				<li>dark <img src='./images/phen2.png'/>: grid and render algorithm execution</li>
			</ul>
			<div id='ord'>
			</div>
			<div id='graph'>
			</div>
			<div id='abs'>
			</div>
			<div id='reg'>
				<p>Linear regression</p>
				<p>(~0,0017.X+0)</p>
			</div>
			<div id='curve1'>
				<p>Linear regression</p>
				<p>(~0,0037.X+0)</p>
			</div>
			<div id='curve2'>
				<p>Linear regression</p>
				<p>(~0,004.X+10);
			</div>
		</div>
		<div id='zoneExpl'>
			<h4>Results</h4>
			<p>These tests were realized under firefox 20.X.X, it appears there is some performances losses under
			firefox 21.0 (calculation time *3). Google chrome works 2 to 3 times faster than firefox and is able to execute the
			algorithm on larger grids before loosing performance.</p>
			<ul>
				<li>The grid calculation algorithm (red) seems to be linear for any grid dimensions.</li>
				<li>For low grid sizes (under 15 000), <span class='blue'>the grid calculation+render(green) is linear and take almost 2 times the sole algorithm
					calculation time for execution</span>; so the render take the same amount of time as the calculation.</li>
				<li>However between 15000 and 20000 cases, calculation+render follows a sigmoid evolution. It would appear that at some point, the render begins to
					need a longer delay in order to succed in displaying all the cells.</li>
				<li>After 20 000, the calculation+renders follows again a linear evolution.</li>
				<li>FPS
					<ul>
						<li>The application runs <span class='blue'>at almost 60FPS</span> for a 5000 cells grid on firefox, the current grid has 3300 cells, thus the animation would appear
								smooth for the user.</li>
						<li>The animation remains at 30ms for 9000 cells on firefox.</li>
						<li>On chrome, we could use a <span class='blue'>9000 cells grid and remain at 60 FPS</span>.</li>
					</ul>
				</li>
				<li>More the grid dimensions is important, more the time needed for execution shows variance. It seems there is more variance on execution time in chrome 
					than in firefox.</li>
				<li>The performance are <span class='blue'>slightly better with canvas render than webGL render (almost 50%)</span>. It might be link to the lack of graphic card in the test computer.</li>
				<li>The application runs on IE only with Canvas renderer (on IE the webGL has to be activated manually), but the render is pretty smooth. Visually the quality is 
					similar with Chrome.</li>
				<li>Whatever the grid is fill, after somes iterations the environment will stabilize and the work time will become constant.</li>
			</ul>
		</div>
	</div>
	<div class='clear'>
	</div>
</article>
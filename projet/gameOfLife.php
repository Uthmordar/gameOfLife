<!-- pixi.js pour le rendu de la grille de cellules -->
<section>
	<div id='contentStat'>
		<div id='infoGame'>
			<div class='fleche'></div>
			<h2>Informations about Conway's Game of Life</h2>
			<p>The <strong class='bold'>Game of Life</strong> is a cellular automaton developed by the mathematician J. H. Conway in 1970.</p>
			<p>This 'game' require only an initial interaction with the user and then users only observe how their creations evolve.</p>
			<p>The universe (grid) of the Game of Life is an infinite two-dimensional orthogonal grid of square cells. These cells
				have only 2 stages : alive or dead. The relation and disposition of these cells will determine their life and death during
				each steps of the process.</p>
			<a href='http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'>>>Want to learn more about Conway's Game of Life</a>
			<div class='clear'></div>
		</div>
		<div id='rules'>
			<div class='fleche'></div>
			<h2>Rules and specificities of the algorithm</h2>
			<p>These version of the game of life use the base rules of Conway's Game of Life : 
				<ul>
					<li>A cell has exactly 8 possible neighbours 2 vertical, 2 horizontal and 4 diagonal</li>
					<li>Dead cell with exactly 3 neighbours cells will come to life</li>
					<li>Live cell with fewer than 2 neighbours die by under-population</li>
					<li>Live cell with more than 3 neighbours die by overcrowding</li>
					<li>Live cell with 2 or 3 neighbours continue his journey</li>
				</ul>
			</p>
			<p>You can also choose the HighLife generation model wich is similar to Conway's game of life except for dead cells coming to life. Indeed, in HighLife dead cells
				will come to life if they have 3 or 6 alive neighbour. HighLife allow a special pattern generator the <span class='replicator'><a href='http://en.wikipedia.org/wiki/HighLife'>replicator</a></span>.</p>
			<p>Once the game is running, every cells generation is created by applying these rules simultaneously on all
				the existing cells.</p>
			<p>In this version, cells are able to carry a specific phenotype among 2 possibles (phen 1 : light, phen 2 : dark). These phenotypes are determinate by you
				only with clicks on dead cells during your pattern creation or determined randomly by algorythm with the auto generation. 
				A new born cell has the same phenotype which prevail in his 3 neighbours (<span class='bold'>in HighLife if there is 3light and 3dark neighbours, dark phenotype will prevail</span>).
			</p>
		</div>
		<div id='background'>
			<div class='fleche'></div>
			<h2>Why use Game of life/cellular automaton</h2>
			<p>Conway's game of life generates patterns which can show us some example of evolution, emergence or
			self-organization which emerge in a population (macro or micro-organism). That's why scientists (biology, math, chemistry ...) use
			it, with a simple initial set of rules we can study how elaborate patterns, organization and complex life form emerge. For 
			example it can help a biologist to understand how living cells in an organism grow together and how their
			inner information determine their organization and further development (ex: animals with pluricolors furs [zebra, cat], shell's color 
			of certain sea creature determine by inhibitor/activator in neighborhood cells, plant gas control with stoma on leaf, why we have space between our fingers).</p>
			<p>With this cellular automaton we are able to observe a large number of phenomen as if we observed Nature, however we know all the
			rules in Life but not all the rules for Nature.</p>
			<p>These simulations allows us to determine how some complex elements should evolve by studying simple element. So , by running some
			specific initial pattern, we are able to discover how complex systems will evolve. The difference between standard program and Life is
			the pattern is generate only by the set of rules rather than situation predicted by the programmer.</p>
			<p>Life also allows us to built a form of computer or similar system. Indeed the program is able to generate some stable gliders or 
			spaceships to represent informations flows and with these information we are able to represent all logical functions
			a computer can perform (AND, OR, NOT...). Thus, with an enough large pattern we could run every program a computer is able to run.</p>
			<p>Studying pattern and succeeding in simulating a situation can help us to solve some real life problems in a large amount of domain such as
			math, biology, computer science :
				<ul>
					<li>Understanding behavior of 'organized' animals society (ants) or intelligent comportment of simple life form.</li>
					<li>Cure for diseases if we understand how external organism interact with our cells and how to counter these effects.</li>
					<li>Struggle against computer viruses which are also cellular automaton.</li>
					<li>Could be use for Cryptography, encoding some data and decoding them.</li> 
				</ul>
			</p>
		</div>
		<div id='gameNav'>
			<form>
				<div id='Mode'>
					<label>Mode :</label><input type='button' name='mode' id='mode' value='Classique'/>
				</div>
				<div id='rand'>
					<input type='text' name='percent' id='percentPop' value='20'/><label>% alive</label>
					<input type='text' name='percent' id='percentPhen' value='50' /><label>% phenotype1</label>
					<input type='button' name='randBut' id='randbut' value='Random'/>
				</div>
				<input type='button' name='Clear' id='Clear' value='Clear'/>
				<input type='button' name='load' id='load' value='Load'/>
			</form>
		</div>
	</div>
	<div id='displayArea'>
		<div id='patternArea'>
			<h2>Initial Pattern</h2>
			<div id='initialPattern'>

			</div>
		</div>
		<div id='controlArea'>
			<h2>Controls</h2>
			<div id='cont1'>
				<h3>Save parameters</h3>
				<form>
					<input type='button' name='save' id='save' value='Update initial with current state'/>
					<input type='button' name='saveInit' id='saveInit' value='Save initial'/>
				</form>
			</div>
			<div id='cont2'>
				<h3>Play controls</h3>
				<p>Number of iterations : <span class='iteration'></span></p>
				<form>
					<input type='text' name='ite' id='ite' value='choose an iteration'/>
					<input type='button' name='goIte' id='goIte' value='go to'/>
					<input type='text' name='speed' id='speed' value='500' /><label>slide speed</label>
					<input type='button' name='autoRun' data-on='off' id='autoRun' value='auto'/>
					<input type='button' name='slideRun' id='slideRun' value='next generation'/>
					<input type='button' name='restart' id='restart' value='restart'/>
				</form>
			</div>
		</div>
		<div class='clear'></div>
		<div id='patternGen'>
			<h2>Generation Pattern</h2>
			<div id='genError'></div>
			<div id='generationPattern'>
			</div>
			<div id='hiddenControl'>
				<p>Controls</p>
				<form>
					<input type='button' name='autoRun2' data-on='off' id='autoRun2' value='auto'/>
					<input type='button' name='slideRun2' id='slideRun2' value='next generation'/>
					<input type='button' name='restart2' id='restart2' value='restart'/>
					<input type='button' name='mode2' id='mode2' value='Classique'/>
					<p>Number of iterations : <span class='iteration'></span></p>
				</form>
			</div>
			<a href='https://github.com/GoodBoyDigital/pixi.js'>Powered with PIXI.js</a>
		</div>
	</div>
</section>
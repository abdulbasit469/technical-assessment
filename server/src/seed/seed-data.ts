export const PEOPLE = [
  { id: 'amina', name: 'Amina Farooq' },
  { id: 'bilal', name: 'Bilal Chaudhry' },
  { id: 'chen', name: 'Chen Wei' },
  { id: 'dara', name: 'Dara Okafor' },
  { id: 'eli', name: 'Eli Marsh' },
];

export const SITES = [
  {
    address: 'tidepool.zz',
    title: 'Tidepool Notes',
    author: 'amina',
    html: `<h1>Tidepool Notes</h1>
<p>Twice a day the sea withdraws and leaves behind a handful of small worlds in the rock. A tidepool is a lesson in patience: anemones close into jelly beads, hermit crabs argue over shells, and a single blenny watches from a crack in the stone.</p>
<p>Come at low tide with soft shoes and no hurry. Turn over nothing, and put back whatever you move. The marsh just inland is worth the walk: see <a href="saltmarsh.zz">The Salt Marsh</a>, or the old light above the point at <a href="lighthouse-keepers.zz">Keepers of the Light</a>.</p>
<p>The tide table I used to keep lived at <a href="tideclock.zz">tideclock.zz</a>, but it appears to have washed out. The <a href="almanac.zz">Small Almanac</a> has a rougher version.</p>`,
  },
  {
    address: 'saltmarsh.zz',
    title: 'The Salt Marsh',
    author: 'amina',
    html: `<h1>The Salt Marsh</h1>
<p>Where the river gives up and the sea has not quite won, cordgrass holds the mud together and samphire grows in green fingers. Wading birds feed along the channels at the turn of the tide, and the whole place smells of iodine and sun-warmed silt.</p>
<p>Honey made from marsh lavender is unusually good, and the keeper at <a href="beekeeping.zz">Hive Log</a> swears by it. For the pools on the rocky side, go back to <a href="tidepool.zz">Tidepool Notes</a>. The mosses along the sea wall are catalogued in the <a href="moss.zz">Moss Field Guide</a>, and the lamp that guides boats in is at <a href="lighthouse-keepers.zz">Keepers of the Light</a>.</p>`,
  },
  {
    address: 'lighthouse-keepers.zz',
    title: 'Keepers of the Light',
    author: 'amina',
    html: `<h1>Keepers of the Light</h1>
<p>The lamp on the point has been automated for decades, but the logbooks survive. They record weather, passing ships and the loneliness of the night watch in a handwriting that gets smaller every winter. One entry, from a gale in March, is only four words long: the lamp held.</p>
<p>On quiet nights the only company was the last bus rumbling along the coast road; its devoted timetable keeper is at <a href="nightbus.zz">The Night Bus</a>. The rocks below are covered in <a href="tidepool.zz">tidepools</a>, and the grassland behind them is <a href="saltmarsh.zz">the marsh</a>. Recordings of the foghorn were once at <a href="kelp-radio.zz">kelp-radio.zz</a>.</p>`,
  },
  {
    address: 'sourdough.zz',
    title: 'Sourdough Diaries',
    author: 'bilal',
    html: `<style>body{background:#fbf3e4;color:#4a3320;font-family:Georgia,serif}a{color:#a4551d}</style>
<h1>Sourdough Diaries</h1>
<p>Day one: flour, water, and a jar on the counter. Day four: bubbles, and a smell somewhere between yoghurt and pears. A starter is a small domesticated weather system, and like weather it responds to temperature, patience and neglect in roughly that order.</p>
<p>My best loaf so far used a long cold proof overnight and a very hot pot with the lid on for the first twenty minutes. Honey from <a href="beekeeping.zz">Hive Log</a> makes a good glaze. The bowls I proof in come from <a href="kiln.zz">Small Kiln Pottery</a>. For more wandering, try the <a href="almanac.zz">Small Almanac</a>, or the mill that once sold me flour at <a href="flour-mill.zz">flour-mill.zz</a>.</p>`,
  },
  {
    address: 'kiln.zz',
    title: 'Small Kiln Pottery',
    author: 'chen',
    html: `<h1>Small Kiln Pottery</h1>
<p>I fire a small electric kiln in a garden shed, three or four times a month. Stoneware shrinks about twelve percent between wet clay and finished pot, which means every mug is a little smaller than the one you imagined. Bisque first, then glaze, then the long climb to cone six.</p>
<p>The chemistry of what goes on the surface is written up in the <a href="glazes.zz">Glaze Notebook</a>. My bread-baking neighbour proofs dough in my bowls: see <a href="sourdough.zz">Sourdough Diaries</a>. Local clay is dug near the banks described in the <a href="moss.zz">Moss Field Guide</a>, and the <a href="almanac.zz">Small Almanac</a> lists firing days by moon phase, which does nothing but is lovely.</p>`,
  },
  {
    address: 'glazes.zz',
    title: 'Glaze Notebook',
    author: 'chen',
    html: `<h1>Glaze Notebook</h1>
<p>A glaze is glass fused to clay: silica for the glass, alumina to stop it running off the pot, and a flux to make it melt at a sensible temperature. Change one ingredient by a spoonful and a glossy celadon becomes a dry, pitted crust.</p>
<p>My favourite recipe uses ash from burnt seaweed gathered at the <a href="tidepool.zz">tidepools</a>, which gives a speckled green-grey like the sea on a cloudy day. Firing notes and kiln schedules live at <a href="kiln.zz">Small Kiln Pottery</a>. The copper red I keep failing to get is documented, sadly, at <a href="copper-red.zz">copper-red.zz</a>, which I never finished writing.</p>`,
  },
  {
    address: 'nightbus.zz',
    title: 'The Night Bus',
    author: 'dara',
    html: `<h1>The Night Bus</h1>
<p>The N7 leaves the depot at 23:40 and takes fifty-one minutes to cover a route that takes eighteen by day. It collects shift workers, musicians with cello cases, and one man who always gets off at the cemetery gates and whom nobody has ever asked why.</p>
<p>I keep the timetable updated by riding it. The route finishes on the coast road below <a href="lighthouse-keepers.zz">the lighthouse</a>. Good stops for sleepless walks are listed in the <a href="almanac.zz">Small Almanac</a>, and the hives I check at dawn after my last ride are written up at <a href="beekeeping.zz">Hive Log</a>. Service to the final stop was cut in spring, and its page is gone from <a href="last-stop.zz">last-stop.zz</a>.</p>`,
  },
  {
    address: 'beekeeping.zz',
    title: 'Hive Log',
    author: 'dara',
    html: `<h1>Hive Log</h1>
<p>Three hives on a south-facing slope, inspected every ten days from April to September. A healthy colony hums on a note you learn to hear from across the garden; a queenless one sounds thin and restless. Smoke calms them, and so does moving slowly.</p>
<p>The bees forage on the marsh lavender at <a href="saltmarsh.zz">the Salt Marsh</a> and on the lime trees by the depot where I catch the <a href="nightbus.zz">night bus</a>. The moss and lichen on the hive stands are identified in the <a href="moss.zz">Moss Field Guide</a>. Surplus honey goes to <a href="sourdough.zz">a baker I know</a>.</p>`,
  },
  {
    address: 'moss.zz',
    title: 'Moss Field Guide',
    author: 'eli',
    html: `<h1>Moss Field Guide</h1>
<p>Mosses have no roots, no flowers and no hurry. Cushion moss forms tight domes on walls; feather moss sprawls over shaded banks in layers like a fern pressed flat. Hold a clump of dry moss, add a few drops of water, and watch it unfurl within seconds.</p>
<p>Best habitats I know: the sea wall behind <a href="saltmarsh.zz">the Salt Marsh</a>, the shaded banks near the clay pit mentioned at <a href="kiln.zz">Small Kiln Pottery</a>, and the stands at <a href="beekeeping.zz">Hive Log</a>. A broader directory of small, slow things is kept in the <a href="almanac.zz">Small Almanac</a>.</p>`,
  },
  {
    address: 'almanac.zz',
    title: 'The Small Almanac',
    author: 'eli',
    html: `<h1>The Small Almanac</h1>
<p>An almanac for people who notice things: first frost, last swallow, the week the elder flowers. It is a directory as much as a calendar, and it is never finished.</p>
<ul>
<li><a href="tidepool.zz">Tidepool Notes</a>: low tides and what hides in them</li>
<li><a href="kiln.zz">Small Kiln Pottery</a>: firing days and clay</li>
<li><a href="sourdough.zz">Sourdough Diaries</a>: a starter, kept alive</li>
<li><a href="moss.zz">Moss Field Guide</a>: slow green things</li>
<li><a href="nightbus.zz">The Night Bus</a>: the last ride home</li>
<li><a href="beekeeping.zz">Hive Log</a>: three hives, ten days apart</li>
</ul>
<p>Looking for something that is not listed? <a href="lost-ferry.zz">The ferry timetable</a> used to be here.</p>`,
  },
];

export const TRAILS: Record<string, string[]> = {
  eli: [
    'almanac.zz', 'tidepool.zz', 'saltmarsh.zz', 'moss.zz', 'kiln.zz', 'glazes.zz',
    'tidepool.zz', 'lighthouse-keepers.zz', 'nightbus.zz', 'beekeeping.zz',
    'sourdough.zz', 'almanac.zz', 'lost-ferry.zz',
  ],
  dara: [
    'nightbus.zz', 'lighthouse-keepers.zz', 'tidepool.zz', 'saltmarsh.zz',
    'beekeeping.zz', 'moss.zz', 'almanac.zz', 'sourdough.zz', 'kiln.zz',
    'glazes.zz', 'kiln.zz', 'moss.zz', 'saltmarsh.zz', 'lighthouse-keepers.zz',
    'kelp-radio.zz',
  ],
  amina: [
    'tidepool.zz', 'saltmarsh.zz', 'lighthouse-keepers.zz', 'tidepool.zz',
    'almanac.zz', 'moss.zz',
  ],
  bilal: [
    'sourdough.zz', 'flour-mill.zz', 'sourdough.zz', 'beekeeping.zz',
    'sourdough.zz', 'kiln.zz', 'glazes.zz',
  ],
  chen: ['kiln.zz', 'glazes.zz', 'tidepool.zz', 'almanac.zz', 'kiln.zz'],
};
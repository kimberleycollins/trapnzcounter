      (async () => {

        const sources = [
          
          // This is where you enter the ID for your project(s). Your project must be listed as public on Trap.NZ for this to function.

              "4237918", // City Sanctuary
              "1570932", // Halo Project
              "1721212", // Possum Free Peninsula
              "15047129", // Predator Free Dunedin
              "10374280", // Aroha Kaikorai Valley
              "2887367", // Brighton Trapping Group
              "1189594", // Chain Hills Restoration Project
              "8470604", // Hikararoa
              "2701489", // Whakahekerau - Second Beach Ecology Action
              "13067734" // Te Nukuroa o Matamata

        ].map((id) => `https://www.trap.nz/project/${id}/killcount.json`);

        // This is where you can add any additional numbers for your project. 
        // E.g. if someone is doing predator control in your community but not reporting the information through Trap.NZ.
        // Change the numbers to 0 if you don't want to introduce any additional devices or kills.

        const totals = {
          devices: 0,
          Possum: 0,
          Rat: 0,
          Mustelid: 0,
        };

        const promises = [];

        for (const url of sources) {
          promises.push(fetch(url));
        }

        const responses = await Promise.all(promises);

        for (const response of responses) {
          const data = await response.json();
          const projectCatches = data.catches.all.species;

          totals.devices += data.traps;

          totals.Possum += projectCatches.Possum;
          totals.Rat += projectCatches.Rat;
          totals.Mustelid += projectCatches.Mustelid;
        }

        document.getElementById("traps").innerHTML = totals.devices;
        document.getElementById("possum").innerHTML = totals.Possum;
        document.getElementById("rat").innerHTML = totals.Rat;
        document.getElementById("mustelid").innerHTML = totals.Mustelid;
        
      })();

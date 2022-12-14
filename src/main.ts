import {
  once,
  setRelaunchButton,
  showUI,
} from "@create-figma-plugin/utilities";

import { CreatePageHandler } from "./types";

export default async function () {
  setRelaunchButton(figma.currentPage, "designToolkit", {
    description: "Useful tools and links",
  });

  once<CreatePageHandler>("CREATE_PAGES", function () {
    // This is the list of pages to create in your document.
    const pages = [
      { name: "๐ผ๏ธ Cover", node: "PAGE", title: "Cover" },
      {
        name: "๐ง About",
        node: "PAGE",
        title: "About",
        description: "Project overview",
      },
      { name: "________________", node: "PAGE" },
      {
        name: "๐ก Explorations",
        node: "PAGE",
        title: "Explorations",
        description: "Explorations and work in progress",
      },
      {
        name: "Workshop",
        node: "PAGE",
        title: "Workshop",
        description: "Artefacts for workshop activity",
      },

      {
        name: "๐ฉ๐ฝโ๐ป User research",
        node: "PAGE",
        title: "User research",
        description: "Field research",
      },
  
      {
        name: "๐งช User test",
        node: "PAGE",
        title: "User test",
        description: "Interactive prototype",

      },
      { name: "________________", node: "PAGE" },

      {
        name: "๐ข Flows",
        node: "PAGE",
        title: "Flows",
        description: "Approved designs, ready for development",
      },

      {
        name: "[Date] Name Flow 1.0",
        node: "PAGE",
        title: "Name Flow 1.0",
        description: "Journey flows and logic",
      },
      {
        name: "[Date] Name Flow 1.1",
        node: "PAGE",
        title: "Name Flow 1.1",
        description: "Journey flows and logic",
      },
      {
        name: "[Date] Name Flow 1.2",
        node: "PAGE",
        title: "Name Flow 1.2",
        description: "Journey flows and logic",
      },
      { name: "________________", node: "PAGE" },
      {
        name: "๐จ Design",
        node: "PAGE",
        title: "Design",
        description:
          "Use case designs",
      },
      {
        name: "Name Design 1",
        node: "PAGE",
        title: "Name Design 1",
        description: "Use case designs",
      },
      {
        name: "Name Design 2",
        node: "PAGE",
        title: "Name Design 2",
        description: "Use case designs",
      },
      { name: "________________", node: "PAGE" },
      {
        name: "๐๏ธ Copy review",
        node: "PAGE",
        title: "Copy review",
        description: "Content for review and sign off",
      },
      {
        name: "๐พ Ready for Dev",
        node: "PAGE",
        title: "Ready for Dev",
        description: "Finals designs for developers",
      },
      { name: "________________", node: "PAGE" },
      {
        name: "๐๏ธ Archived",
        node: "PAGE",
        title: "Archived",
        description: "Designs archived to retrieve",
      },
      {
        name: "๐ชฆ Deprecated",
        node: "PAGE",
        title: "Deprecated",
        description: "Designs death โ literally",
      },
    ];

    // Show a notification

    figma.notify("Building template", { timeout: Infinity });

    // Load any custom fonts required for editing text layers.
    // Figma developer console will advise you if you need to include any missing fonts.

    async function loadFont() {
      figma.loadFontAsync({ family: "Work Sans", style: "Bold" });
      figma.loadFontAsync({ family: "Open Sans", style: "Regular" });
      figma.loadFontAsync({ family: "Open Sans", style: "SemiBold" });
    }

    function insertTitle(pageName: string) {
      let matchPage = pages.filter((page) => page.name === pageName)[0];
      if (matchPage.title == null) {
        console.error("No title added on: " + matchPage.name);
      } else {
        if (pageTitleComponent) {
          let titleInstance: InstanceNode = pageTitleComponent.createInstance();

          let replaceTitle: any = titleInstance.findOne(
            (n) => n.name === "pageTitle" && n.type === "TEXT"
          );

          if (replaceTitle && replaceTitle.type === "TEXT") {
            replaceTitle.characters = matchPage.title;
          }

          let replaceDescription: any = titleInstance.findOne(
            (n) => n.name === "pageDescription" && n.type === "TEXT"
          );

          if (replaceDescription && replaceDescription.type === "TEXT") {
            replaceDescription.characters = matchPage.description;
          }
          figma.viewport.scrollAndZoomIntoView([titleInstance]);
        }
      }
    }

    // Setup your components for import into pages

    // Cover component
    let coverComponent: ComponentNode | null = null;

    async function getCoverComponent() {
      const coverComponentKey = "49f982a66f6dd65f7ebce2c6400980e5235c1722"; // Replace this with the Key for your cover component.
      const instance = await figma.importComponentByKeyAsync(coverComponentKey);
      coverComponent = instance;
    }

    // Title component
    let pageTitleComponent: ComponentNode | null = null;

    async function getPageTitleComponent() {
      const pageTitleComponentKey = "8c50e6a73ddd2e5e5d996717b2687648e84e225a"; // Replace this with the Key for your title component.
      const instance = await figma.importComponentByKeyAsync(pageTitleComponentKey);
      pageTitleComponent = instance;
    }

    // Example of a component to be imported
    let exampleComponent: ComponentNode | null = null;

    async function getExampleComponent() {
      const exampleComponentKey = "74d4f74afc3a993f1a2b74ae20d8e6535db66b33"; // This is an example component, use this block as a reference when for importing additional components
      const instance = await figma.importComponentByKeyAsync(exampleComponentKey);
      exampleComponent = instance;
    }

    // The following section is contained within a Promise, which means it only runs when the above components and fonts are available.

    Promise.all([
      getCoverComponent(),
      getPageTitleComponent(),
      getExampleComponent(),
      loadFont(),
    ]).then(() => {
      console.log("%cFonts and components loaded", "color:green");

      // This forEach loop goes through the list of pages and creates each one using the 'name' values.
      let createdPages: PageNode[] = []
      pages.forEach((page) => {
        const newPage = figma.createPage();
        newPage.name = page.name;
        if (newPage.name !== 'Cover') {
          figma.currentPage = newPage;
          insertTitle(page.name);
        }
        createdPages.push(newPage) // Inserts the heading component from library if there is a "title" value in your pages array.
      });

      console.log("%cPages built", "color:green");

      // Switch to page called "Cover"
      const coverPage = createdPages.filter((page) => page.name === "Cover")[0];
      figma.currentPage = coverPage;

      // Insert Cover component instance
      if (coverComponent) {
        const coverInstance: InstanceNode = coverComponent.createInstance();

        // Find the text layer called "Title" and replaces it with the value of titleText.
        const titleText = "Title";

        const coverTitle = coverInstance.findOne(
          (n) => n.name === "title" && n.type === "TEXT"
        );
        if (coverTitle && coverTitle.type === "TEXT") {
          coverTitle.characters = titleText;
        }

        // Find the text layer called "description" and replaces it with the value of descriptionText.
        const descriptionText = "Enter a description for this file.";

        const coverDescription = coverInstance.findOne(
          (n) => n.name === "description" && n.type === "TEXT"
        );
        if (coverDescription && coverDescription.type === "TEXT") {
          coverDescription.characters = descriptionText;
        }
        // Find the text layer called 'userName' and replaces it with the value of authorName.
        if(figma.currentUser) {
          const authorName = figma.currentUser.name;
          const coverAuthor = coverInstance.findOne(
            (n) => n.name === "userName" && n.type === "TEXT"
          );
          if (coverAuthor && coverAuthor.type === "TEXT") {
            coverAuthor.characters = authorName;
          }
        }

        // Get the current month and year, if you'd like a date stamp on your cover
        let monthIndex: number = new Date().getMonth();
        let yearIndex: number = new Date().getFullYear();
        const month: number = monthIndex; // 1 for Jan, 2 for Feb
        const year: number = yearIndex; // 1 for Jan, 2 for Feb
        const monthNames: Array<string> = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        // Find the text layer called 'dateCreated' and replaces it with the month and year.
        const coverDate = coverInstance.findOne(
          (n) => n.name === "dateCreated" && n.type === "TEXT"
        );
        if (coverDate && coverDate.type === "TEXT") {
          coverDate.characters = monthNames[month] + " " + year;
        }

        // Change the background colour of the cover page, perfect for making a seamless cover image in Figma.
        // Colours must be converted to RGB format.

        figma.currentPage.backgrounds = [
          {
            type: "SOLID",
            color: {
              r: 1,
              g: 1,
              b: 1,
            },
          },
        ];

        // Set the page to zoom to fit the cover instance
        figma.viewport.scrollAndZoomIntoView([coverInstance]);

        console.log("%cCover inserted", "color:green");
      }

      // Insert Example component
      const pageExample = createdPages.filter((page) => page.name === "๐ค About")[0]; // Choose the page to insert component on
      figma.currentPage = pageExample; // Switch to that page

      if (exampleComponent) {
        const exampleInstance = exampleComponent.createInstance(); // Insert the example component

        exampleInstance.y = 500; // Move it down below the heading
        var exampleInstanceWidth = 3000; // Define a new width
        var exampleInstanceHeight = 2000; // Define a new height
        exampleInstance.resize(exampleInstanceWidth, exampleInstanceHeight); // Resize the component

        let newSelection = figma.currentPage.findChildren(
          (n) => n.type === "INSTANCE"
        );

        figma.currentPage.selection = newSelection;
        figma.viewport.scrollAndZoomIntoView(newSelection);
        figma.currentPage.selection = [];
      }

      // Go back to the Cover page
      figma.currentPage = coverPage;

      // Remove the initial 'Page 1' that isn't required any longer
      let initialPage = figma.root.children[0];
      initialPage.remove();

      figma.closePlugin("Design Toolkit template applied");
    });
  });
  showUI({
    width: 320,
    height: 320,
  });
}

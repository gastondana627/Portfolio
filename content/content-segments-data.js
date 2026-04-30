(function() {
  const data = {
    // Quarters - Quarterly project showcases
    quarters: {
        id: "quarters",
        title: "Quarters",
        description: "Quarterly project showcases and milestone achievements",
        type: "image-gallery",
        active: true,
        items: [
            {
                id: "q1-2024",
                title: "Q1 2024 Highlights",
                period: "January - March 2024",
                thumbnailPath: "/content/assets/segments/quarters/quarter1/1.png",
                images: [
                    "/content/assets/segments/quarters/quarter1/1.png",
                    "/content/assets/segments/quarters/quarter1/2.png",
                    "/content/assets/segments/quarters/quarter1/3.png",
                    "/content/assets/segments/quarters/quarter1/4.png",
                    "/content/assets/segments/quarters/quarter1/5.png",
                    "/content/assets/segments/quarters/quarter1/6.png",
                    "/content/assets/segments/quarters/quarter1/7.png",
                    "/content/assets/segments/quarters/quarter1/8.png",
                    "/content/assets/segments/quarters/quarter1/9.png",
                    "/content/assets/segments/quarters/quarter1/10.png"
                ],
                description: "Major projects and achievements from Q1 2024"
            },
            {
                id: "q2-2024",
                title: "Q2 2024 Highlights",
                period: "April - June 2024",
                thumbnailPath: "/content/assets/segments/quarters/quarter2/Thumby_Quarters.png",
                videoPath: "/content/assets/segments/quarters/quarter2/A hyper-realistic image captures a black Cairn Terrier in a full NASA-engineered spacesuit confidently exploring a Martian ridge, accompanied by a humanoid robotic assistant and a floating AI self.mp4",
                images: [
                    "/content/assets/segments/quarters/quarter2/Thumby_Quarters.png"
                ],
                description: "Key developments and milestones from Q2 2024"
            },
            {
                id: "q3-2024",
                title: "Q3 2024 Highlights",
                period: "July - September 2024",
                thumbnailPath: "/content/assets/segments/quarters/quarter3/Thumby.png",
                videoPath: "/content/assets/segments/quarters/quarter3/Quarters 3.mp4",
                images: [
                    "/content/assets/segments/quarters/quarter3/Thumby.png"
                ],
                description: "Progress and achievements from Q3 2024"
            }
        ]
    },

    // Prompt of the Month - Monthly creative prompts and responses
    promptOfTheMonth: {
        id: "prompt-of-the-month",
        title: "Prompt of the Month",
        description: "Monthly creative AI prompts and visual explorations",
        type: "video-gallery",
        active: true,
        items: [
            {
                id: "potm-january",
                title: "Surf's Up - January",
                month: "January",
                year: 2024,
                thumbnailPath: "/content/assets/segments/promptofthemonth/January/Thumby.png",
                videoPath: "/content/assets/segments/promptofthemonth/January/Prompt of the Month-Surfs Up.mp4",
                duration: "1:30",
                prompt: "Surf's Up",
                description: "Exploring fresh perspectives and creative beginnings with ocean vibes"
            },
            {
                id: "potm-february",
                title: "February",
                month: "February",
                year: 2024,
                thumbnailPath: "/content/assets/segments/promptofthemonth/February/Thumby.png",
                videoPath: "/content/assets/segments/promptofthemonth/February/Prompt Of The Month - February.mp4",
                duration: "1:45",
                prompt: "Love and Connection",
                description: "Visual interpretations of human connection and emotion"
            },
            {
                id: "potm-march",
                title: "RadCliffe Wave - March",
                month: "March",
                year: 2024,
                thumbnailPath: "/content/assets/segments/promptofthemonth/March/Prompt of the Month RadCliffe Wave-Where the Stars Are Born.png",
                videoPath: "/content/assets/segments/promptofthemonth/March/Radcliffe Wave.mp4",
                duration: "2:00",
                prompt: "RadCliffe Wave - Where the Stars Are Born",
                description: "Cosmic exploration and stellar formation visualization"
            },
            {
                id: "potm-april",
                title: "MAJORANA - April",
                month: "April",
                year: 2024,
                thumbnailPath: "/content/assets/segments/promptofthemonth/April/Prompt of the Month.png",
                videoPath: "/content/assets/segments/promptofthemonth/April/MAJORANA.mp4",
                duration: "1:50",
                prompt: "MAJORANA",
                description: "Exploring quantum physics and particle mysteries"
            },
            {
                id: "potm-may",
                title: "10 CVEs of 2025 - May",
                month: "May",
                year: 2024,
                thumbnailPath: "/content/assets/segments/promptofthemonth/May/FMU.png",
                videoPath: "/content/assets/segments/promptofthemonth/May/Prompt of the Month - 10 CVEs of 2025-2.mp4",
                duration: "2:15",
                prompt: "10 CVEs of 2025",
                description: "Cybersecurity vulnerabilities and future tech challenges"
            },
            {
                id: "potm-june",
                title: "June",
                month: "June",
                year: 2024,
                thumbnailPath: "/content/assets/segments/promptofthemonth/June/Prompt of the Month June Thumbnail 1_1.png",
                videoPath: "/content/assets/segments/promptofthemonth/June/PromptoftheMonth_June.mp4",
                duration: "1:55",
                prompt: "Summer Solstice",
                description: "Light, energy, and creative peak expression"
            },
            {
                id: "potm-july",
                title: "Ocean's Heartbeat - July",
                month: "July",
                year: 2024,
                thumbnailPath: "/content/assets/segments/promptofthemonth/July/PofT Oceans HeartBeat July_Final_Thumbie_2.png",
                videoPath: "/content/assets/segments/promptofthemonth/July/Prompt of the Month July 1_by_1.mp4",
                duration: "2:10",
                prompt: "Ocean's Heartbeat",
                description: "Exploring the rhythm and life of our oceans"
            },
            {
                id: "potm-september",
                title: "FMU - September",
                month: "September",
                year: 2024,
                thumbnailPath: "/content/assets/segments/promptofthemonth/September/FMU.png",
                videoPath: "/content/assets/segments/promptofthemonth/September/Prompt of the Month - September (FMU).mp4",
                duration: "1:40",
                prompt: "Future Meets Universe",
                description: "Change, transformation, and creative evolution"
            }
        ]
    },

    // Vitrine Steganos - Video content series
    vitrineSteganos: {
        id: "vitrine-steganos",
        title: "Vitrine Steganos",
        description: "Creative podcast series and branded content explorations",
        type: "video-gallery",
        active: true,
        items: [
            {
                id: "vs-podcast-ep2",
                title: "Vitrine Steganos - Final Version",
                series: "Ally & Ivan Podcast",
                thumbnailPath: "/content/assets/segments/vitrinesteganos/Ally_and_Ivan_Podcast/Vitrine Steganos_2_Final Version_thumb.png",
                videoPath: "/content/assets/segments/vitrinesteganos/Ally_and_Ivan_Podcast/Vitrine Steganos_2_Final Version.mp4",
                duration: "45:30",
                description: "Deep dive into surveillance and privacy implications"
            },
            {
                id: "vs-podcast-ep3",
                title: "Vitrine Steganos - AI Predictive Policing",
                series: "Ally & Ivan Podcast",
                thumbnailPath: "/content/assets/segments/vitrinesteganos/Ally_and_Ivan_Podcast/Vitrine Steganos_3_Ai_Predictive Policing_thumb.png",
                videoPath: "/content/assets/segments/vitrinesteganos/Ally_and_Ivan_Podcast/Vitrine Steganos_3_Ai_Predictive Policing.mp4",
                duration: "52:15",
                description: "Exploring the ethics and technology of AI in law enforcement"
            },
            {
                id: "vs-podcast-ep5-part1",
                title: "Vitrine Steganos Episode 5 - Part I Finale",
                series: "Ally & Ivan Podcast",
                thumbnailPath: "/content/assets/segments/vitrinesteganos/Ally_and_Ivan_Podcast/Vitrine Steganos_5_Part_I_Finale_thumb.png",
                videoPath: "/content/assets/segments/vitrinesteganos/Ally_and_Ivan_Podcast/Vitrine Steganos_5_Part_I_Finale.mp4",
                duration: "38:45",
                description: "Season finale part one - Creative technology retrospective"
            },
            {
                id: "vs-podcast-ep5-part2",
                title: "Vitrine Steganos Episode 5 - Part II",
                series: "Ally & Ivan Podcast",
                thumbnailPath: "/content/assets/segments/vitrinesteganos/Ally_and_Ivan_Podcast/Vitrine Steganos_5_Part II_thumb.png",
                videoPath: "/content/assets/segments/vitrinesteganos/Ally_and_Ivan_Podcast/Vitrine Steganos_5_Part II.mp4",
                duration: "41:20",
                description: "Season finale part two - Future of creative AI"
            },
            {
                id: "vs-podcast-xmas",
                title: "VS Xmas Edition",
                series: "Ally & Ivan Podcast",
                thumbnailPath: "/content/assets/segments/vitrinesteganos/Ally_and_Ivan_Podcast/VS_XMas Edition_thumb.png",
                videoPath: "/content/assets/segments/vitrinesteganos/Ally_and_Ivan_Podcast/VS_XMas Edition.mp4",
                duration: "35:10",
                description: "Special holiday episode celebrating creativity and innovation"
            }
        ]
    },

    // Intergalactic Burger Shack
    intergalacticBurgerShack: {
        id: "intergalactic-burger-shack",
        title: "Intergalactic Burger Shack",
        description: "Cosmic fast food commercial series across the solar system",
        type: "video-gallery",
        active: true,
        items: [
            {
                id: "vs-burger-earth",
                title: "Burger Shack - Earth Edition",
                series: "Intergalactic Burger Shack",
                thumbnailPath: "/content/assets/segments/vitrinesteganos/Intergalactic_BurgerShack/IGCD_Burger_Shack_Ad_1_Earth_Edition_thumb.png",
                videoPath: "/content/assets/segments/vitrinesteganos/Intergalactic_BurgerShack/IGCD_Burger_Shack_Ad_1_Earth_Edition.mp4",
                duration: "0:30",
                description: "Cosmic fast food commercial - Earth location"
            },
            {
                id: "vs-burger-mars",
                title: "Burger Shack - Mars Edition",
                series: "Intergalactic Burger Shack",
                thumbnailPath: "/content/assets/segments/vitrinesteganos/Intergalactic_BurgerShack/IGCD_Buger_Shack_Ad_2_Mars_Edition_thumb.png",
                videoPath: "/content/assets/segments/vitrinesteganos/Intergalactic_BurgerShack/IGCD_Buger_Shack_Ad_2_Mars_Edition.mp4",
                duration: "0:30",
                description: "Cosmic fast food commercial - Mars location"
            },
            {
                id: "vs-burger-venus",
                title: "Burger Shack - Venus Edition",
                series: "Intergalactic Burger Shack",
                thumbnailPath: "/content/assets/segments/vitrinesteganos/Intergalactic_BurgerShack/IGCD_Burger_Shack_Ad_3_Venus_Edition_thumb.png",
                videoPath: "/content/assets/segments/vitrinesteganos/Intergalactic_BurgerShack/IGCD_Burger_Shack_Ad_3_Venus_Edition.mp4",
                duration: "0:30",
                description: "Cosmic fast food commercial - Venus location"
            }
        ]
    }
};
  window.ContentSegmentsData = Object.assign(window.ContentSegmentsData || {}, data);
})();

window.SegmentHelpers = Object.assign(window.SegmentHelpers || {}, {
    // Get all active segments
    getActiveSegments() {
        return Object.values(window.ContentSegmentsData).filter(segment => segment.active);
    },

    // Get segment by ID
    getSegmentById(segmentId) {
        return Object.values(window.ContentSegmentsData).find(segment => segment.id === segmentId);
    },

    // Get all items from a specific segment
    getSegmentItems(segmentId) {
        const segment = this.getSegmentById(segmentId);
        return segment ? segment.items : [];
    },

    // Get item by ID from any segment
    getItemById(itemId) {
        for (const segment of Object.values(window.ContentSegmentsData)) {
            const item = segment.items?.find(item => item.id === itemId);
            if (item) return { segment: segment.id, item };
        }
        return null;
    }
});

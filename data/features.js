export const featuresData = [
  {
    slug: "alarms-alerts",
    title: "Alarms",
    subtitle: "Notify the customer",
    description: `
      You have three options for sending messages with instructions to the customer:
      1. Send SMS with a reference to the utility’s website.
      2. Send email with a link to further information.
      3. Send push notification to the app with references.
    `,
    images: ["/img/Alarm.png", "/img/Alarm2.png"]
  },
  {
    slug: "fixed-network",
    title: "Fixed Network",
    subtitle: "Track you consumption",
    description: `
      When you open the Meterportal app, you immediately get an overview of your water consumption, both overall and in detail. The front page shows a visual summary of your usage, including how much you used today compared to yesterday, your average usage over the last 7 and 30 days, and a bar graph of your daily consumption to highlight which days use the most water. You can tap «View details» for deeper insights.

    In the detailed view, you can track your water consumption hour by hour, making it easier to spot leaks or unusual patterns. You can also switch between views for hours, days, months, and years, with all data clearly presented in graphs that display volumes in liters or cubic meters.
    `,
    images: ["/img/fixed_network.png", "/img/fixed2.png"]
  },
  {
    slug: "drive-by-readings",
    title: "Drive-by",
    subtitle: "Get smart records of your consumptions",
    description: `
      When meter data is collected via drive-by, the time intervals between each individual reading are considerably longer compared to other types of data collection. This means that the system does not receive consumption values as frequently, and therefore it is not possible to present an exact breakdown for every single day in that period.

To give you a meaningful overview despite the longer gaps, we instead calculate a daily average. This daily average is based on the total water consumption measured between the most recent reading and the previous one, and then distributed across the number of days in that interval. In this way, you still get a clear picture of your typical daily usage, even if the data is collected less often.
    `,
    images: ["/img/drive2.png", "/img/drive_by.png"]
  },
  {
    slug: "multiple-address",
    title: "Multiple Adresses",
    subtitle: "Be in control of few adresses",
    description: `
      In the app, you have the option to select and manage several different addresses that you want to keep track of. This makes it possible to monitor water consumption not just for one place, but for multiple homes, apartments, or properties at the same time, all gathered in one convenient overview.

In addition to tracking, you can also set up notifications for the addresses you follow. This means you will be alerted if there are important updates, unusual consumption patterns, or other relevant information. In this way, the app helps you stay informed and in control of water usage across all the locations you care about.

    `,
    images: ["/img/multiple2.png", "/img/multiple_adresses.png"]
  },
  {
    slug: "notifications",
    title: "Notifications",
    subtitle: "Get notified fast and easy",
    description: `
      Give your customers the opportunity to better protect their property by enabling warnings if leaks or other irregularities in water consumption are detected. This feature helps reduce the risk of damage and unnecessary costs by making sure issues are identified as early as possible.

Consumers can decide how they want to be notified, with the flexibility to choose between email, SMS, or push alerts directly in the app. This way, they can always stay informed in the way that suits them best and take quick action when needed.

    `,
    images: ["/img/notificat.png", "/img/notif2.png"]
  },
  {
    slug: "invoices",
    title: "Invoices",
    subtitle: "Get clear invoices ",
    description: `
      Inside the app, customers can access clear and easy-to-understand invoices for water, heating, and electricity, all gathered conveniently in one place. This makes it simple to keep track of different utility costs without having to switch between multiple systems or platforms.

Each invoice is available directly in the app and can also be downloaded as a PDF attachment for your records. This ensures that customers always have quick access to their payment history, whether they want to review it online or save it for later.

    `,
    images: ["/img/invoices.png", "/img/invoice2.png"]
  }
];

# GDGC Community App

The **GDGC** (Google Developer Group Community) mobile application aims to enhance community engagement, offering members features like event updates, discussion forums, notifications, and resource sharing. Built with **Expo**, this cross-platform app ensures a smooth and responsive experience across both iOS and Android devices. 

Key features include member profiles, event listings, notifications, forums, and more.

## Features

1. **Event Listings**: Displays both past and upcoming GDGC events with detailed descriptions, dates, and times.
2. **Discussion Forums**: Allow members to participate in or create discussions on various community-related topics.
3. **Resource Sharing**: Members can share resources, documents, and useful links across different categories.
4. **Notifications**: Receive updates on important GDGC events, including hackathons, workshops, and more.
5. **Home Page**: Displays general information about GDGC, domains, and active members.

## Tech Stack

- **Platform**: [Expo](https://expo.dev/)
- **Authentication, Database, Backend, and Storage**: [supabase](https://supabase.com/)
- **API fetching and State Management**: [React Query](https://tanstack.com/query)
- **Component Libraries**: [shadcn/ui](https://ui.shadcn.com/) , [react-native-reusables](https://github.com/mrzachnugent/react-native-reusables)
- **Icons**: [Expo Vector Icons](https://icons.expo.fyi/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [NativeWind](https://www.nativewind.dev/)

## Getting Started

To run the project locally, follow these steps:

### Clone the Repository

```bash
git clone https://github.com/UdaySagar-Git/GDSC-Community-app.git
cd GDSC-Community-app
```

### Install Dependencies

We use **Bun** for dependency management. If you prefer **npm** or **yarn**, feel free to use them instead:

```bash
bun install
```

### Set Up Environment Variables

Create a `.env` file in the project root and add the following environment variables:

```
EXPO_PUBLIC_API_URL=your_api_url
EXPO_PUBLIC_API_KEY=your_api_key
```

### Start the Development Server

To start the Expo development server, run:

```bash
bun start
```

## Demo

For a demo of the app in action (recommended to watch at 2x speed to save time):

https://github.com/user-attachments/assets/ffbc2a49-d880-4246-acda-9006b77ba67b

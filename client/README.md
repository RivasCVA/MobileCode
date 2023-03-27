# Mobile App Client

Mobile app built with React Native.

##  Setup

### Install Modules

Build the `node_modules` folder:

```
npm install
```

### For iOS

If running on iOS, make sure to build the `Pods` folder:

```
cd ios
pod install
```

## Run

### Start Metro

In one terminal window, start metro:

```
npm start
```

### Reset Metro Cache

If you want to reset metro cache, start metro fresh:

```
npm run start:fresh
```

### Run for iOS

In a second terminal window, run the app for iOS:

```
npm run ios
```

### Run for a Specific iOS Device

Run the app for a specific iOS simulator:

```
npm run ios -- --simulator="iPhone 14 Pro"
```

import AsyncStorage from "@react-native-async-storage/async-storage";

const prefix = "Breeze:";

const store = async (key: string, value: any, expiryInHours: number = 1) => {
  try {
    const item = {
      value,
      timestamp: Date.now() + hoursToMs(expiryInHours),
    };
    await AsyncStorage.setItem(prefix + key, JSON.stringify(item));
  } catch (error) {
    console.log(error);
  }
};

const get = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(prefix + key);
    const item = JSON.parse(value!);

    if (!item) return null;

    if (isExpired(item)) {
      await AsyncStorage.removeItem(prefix + key);
      return null;
    }

    return item.value;
  } catch (error) {
    console.log(error);
  }
};

const isExpired = (item: any) => {
  return Date.now() > item["timestamp"];
};

const hoursToMs = (hours: number) =>{
  return 1000 * 60 * 60 * hours;
}

export default {
  store,
  get,
};

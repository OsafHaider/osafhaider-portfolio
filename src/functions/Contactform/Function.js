import axios from "axios";

export default async function contactFormfunction(data, toast) {
  try {
    const response = await axios.post("/api/query", data, {
      headers: {
        Authorization:
          "njcieciweicwu261676671xnkxjjnqxexiqn1903743147991341418471nmjmlek",
      },
    });
    const res = response.data;
    const message = res.message;
    if (res.success) {
      toast({
        title: message,
      });
    } else {
      toast({
        title: res.message || "Query submission failed!",
        variant: "destructive",
      });
    }
  } catch (error) {
    console.log(error);
    const message = error.response?.data?.message || "An error occurred";
    toast({
      title: message,
      variant: "destructive",
    });
  }
}

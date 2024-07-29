import axios from "axios";

export default async function loginfunction(data, toast, router, setLoading) {
  try {
    setLoading(true);
    const response = await axios.post("/api/auth/user/login", data, {
      headers: {
        Authorization:
          "njcieciweicwu261676671xnkxjjnqxexiqn1903743147991341418471nmjmlek",
      },
    });
    const res = response.data;
    if (res.success) {
      toast({
        title: res.message,
      });
    } else {
      toast({
        title: res.message || "Login failed!",
      });
    }
  } catch (error) {
    console.log(error);
    toast({
      variant: "destructive",
      title: error.response?.data?.message || "An error occurred!",
    });
  } finally {
    setLoading(false);
  }
}

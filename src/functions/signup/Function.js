import axios from "axios";

export default async function signupfunction(data, toast, router, setLoading) {
  try {
    setLoading(true);
    const response = await axios.post("/api/user/signup", data, {
      headers: {
        Authorization:
          "njcieciweicwu261676671xnkxjjnqxexiqn1903743147991341418471nmjmlek",
      },
    });
    const res = response.data;
    if (res.success) {
      router.push("/");
      toast({
        title: res.message,
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

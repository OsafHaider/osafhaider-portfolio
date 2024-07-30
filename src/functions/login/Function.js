import axios from "axios";

export default async function loginfunction(
  data,
  toast,
  router,
  setLoading,
  form
) {
  try {
    setLoading(true);
    const response = await axios.post("/api/auth/user/login", data, {
      headers: {
        Authorization:
          "njcieciweicwu261676671xnkxjjnqxexiqn1903743147991341418471nmjmlek",
      },
    });
    console.log(response);
    const res = response.data;
    if (res.success) {
      form.reset();
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

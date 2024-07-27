import ky from "ky";

export default async function signupfunction(data, toast, router, setLoading) {
  try {
    setLoading(true);
    const req = await ky.post("/api/user/signup", {
      headers: {
        Authorization:
          "njcieciweicwu261676671xnkxjjnqxexiqn1903743147991341418471nmjmlek",
      },
      json: data,
    });
    const res = await req.json();
    if (res.success) {
      toast({
        title: res.message,
      });
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  } catch (error) {
    console.log(error);
    toast({
      title: error.response?.data?.message || "An error occurred!",
    });
  } finally {
    setLoading(false);
  }
}

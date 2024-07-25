import ky from "ky";

export default async function signupfunction(data, toast, router, setLoading) {
  try {
    console.log(data);
    setLoading(true);
    const req = await ky.post("/api/user/signup", {
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

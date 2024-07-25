import ky from "ky";

export default async function loginfunction(data, toast, router, setLoading) {
  try {
    setLoading(true);
    const req = await ky.post("/api/auth/user/login", {
      json: data,
    });
    const res = await req.json();
    if (res.success) {
      toast({
        title: res.message,
      });
      setTimeout(() => {
        router.push("/");
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

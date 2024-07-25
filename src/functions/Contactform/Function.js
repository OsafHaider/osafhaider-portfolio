import ky from "ky";
export default async function contactFormfunction(data, toast) {
  try {
    const req = await ky.post("/api/query", {
      json: data,
    });
    const res = await req.json();
    const message = res.message;
    if (res.success) {
      toast({
        title: { message },
      });
    }
  } catch (error) {
    console.log(error);
    const message = error.response?.data?.message || "An error occurred";
    toast({
      title: { message },
      variant: "destructive",
    });
  }
}

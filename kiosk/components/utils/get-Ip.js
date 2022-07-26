export const getIp = (setuserview) => {
    try {
        (async () => {
            if (navigator.userAgent.includes("Windows")) {
                const res = await fetch(
                    "https://api.ipify.org/?format=json"
                );
                const data = await res.json();
                // console.log({ device: "desktop", ip: data.ip });
    
                setuserview({ device: "desktop", ip: data.ip });
            }
            if (navigator.userAgent.includes("iPad")) {
                const res = await fetch(
                    "https://api.ipify.org/?format=json"
                );
                const data = await res.json();
                // console.log({ device: "desktop", ip: data.ip });
    
                setuserview({ device: "desktop", ip: data.ip });
            }
            if (navigator.userAgent.includes("MacOS")) {
                const res = await fetch(
                    "https://api.ipify.org/?format=json"
                );
                const data = await res.json();
                // console.log({ device: "desktop", ip: data.ip });
    
                setuserview({ device: "desktop", ip: data.ip });
            }
            if (navigator.userAgent.includes("iPhone")) {
                const res = await fetch(
                    "https://api.ipify.org/?format=json"
                );
                const data = await res.json();
                // console.log({ device: "mobile", ip: data.ip });
    
                setuserview({ device: "mobile", ip: data.ip });
            }
            if (
                navigator.userAgent.includes("Android") &&
                navigator.userAgent.includes("Linux")
            ) {
                const res = await fetch(
                    "https://api.ipify.org/?format=json"
                );
                const data = await res.json();
                // console.log({ device: "mobile", ip: data.ip });
    
                setuserview({ device: "mobile", ip: data.ip });
            }
            if (
                navigator.userAgent.includes("Linux") &&
                !navigator.userAgent.includes("Android")
            ) {
                const res = await fetch(
                    "https://api.ipify.org/?format=json"
                );
                const data = await res.json();
                // console.log({ device: "desktop", ip: data.ip });
    
                setuserview({ device: "desktop", ip: data.ip });
            }
            // console.log(/Windows/.test(navigator.userAgent));
        })();
    } catch (error) {
        console.log(error)
    }
   
}
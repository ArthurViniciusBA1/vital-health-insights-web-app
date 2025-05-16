import Image from "next/image";

export default function Footer() {
    
    return (
        <footer className="max-w-4xl h-20 mx-auto flex items-center justify-between self-end gap-12">
            <Image src={"/logoUNA.svg"} width={117} height={50} alt={"Logo UNA"}/>
            <Image src={"/VitalHeathLogo.svg"}  width={86} height={50} alt={"Logo Vital Health Insights"}/>
        </footer>
    );
}
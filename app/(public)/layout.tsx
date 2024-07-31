import Sidebar from "@/components/sidebar";
import Particles from "@/components/ui/particles";
import { cn } from "@/lib/utils";
import { Space_Grotesk } from "next/font/google";

const sp = Space_Grotesk({ display: "swap", subsets: ["latin"] });

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
	return (
		<main
			className={cn(
				"min-h-screen w-full bg-transparent flex-1 py-24",
				sp.className,
			)}
		>
			<Sidebar />
			{children}
			<Particles
				className="absolute inset-0 -z-10"
				quantity={50}
				ease={70}
				size={0.05}
				staticity={40}
				color="#ffffff"
			/>
		</main>
	);
};

export default PublicLayout;

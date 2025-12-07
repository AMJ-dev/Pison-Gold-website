import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Bounce, ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Routers from "@/Routers";
import UserProvider from "@/context/userProvider";
const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<TooltipProvider>
			<Toaster />
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
				transition={Bounce}
			/>
			<Sonner />
			<UserProvider>
				<Routers/>
			</UserProvider>
		</TooltipProvider>
	</QueryClientProvider>
);

export default App;

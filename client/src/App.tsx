import { useEffect, useState } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Diary from "@/pages/Diary";
import ArchivedBirthday from "@/pages/ArchivedBirthday";
import NotFound from "@/pages/not-found";
import { findBirthdayEdition } from "@/lib/birthday-editions";
import "@/pages/Diary.css";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function App() {
  const edition = findBirthdayEdition(new URLSearchParams(window.location.search).get("year"));
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem("authenticated") === "true",
  );

  useEffect(() => {
    if (edition) document.title = `Sukheswari Diaries | The ${edition.year} Chapter`;
  }, [edition]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <WouterRouter base={basePath}>
          <Switch>
            <Route path="/">
              {!edition ? <NotFound /> : edition.kind === "archive" ? (
                <ArchivedBirthday edition={edition} />
              ) : (
                <Diary
                  isAuthenticated={isAuthenticated}
                  onAuthenticated={() => setIsAuthenticated(true)}
                />
              )}
            </Route>
            <Route component={NotFound} />
          </Switch>
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

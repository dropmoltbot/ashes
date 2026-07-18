# AUDIT ASHES — ce qui manque (vu par le build, pas l'user)

## Interface

1. **Pas de page `loading`Skeleton`** au mount — on voit le flash blanc avant que React mount
2. **Hero est vide sans indication visuelle de progression** — quand pas connecté, juste un line de texte. Doit y avoir:
   - Feature cards (3 mini-cards: "Ritual", "Heir", "Claim")
   - Une mini-feature/argument du pitch
3. **Le ring de countdown** n'est pas visible avant connexion. Sur la landing page, il doitضهر avec un faux-état "30 days — Limit" pour montrer ce que le user obtiendra
4. **Le hover des tabs** fait `scale: 1.05` mais on banle les autres tabs qui doivent se dimmer/informer
5. **Inputs** n'ont pas de bouton "Max" sur les input MON pour préremplir
6. **Toast** position bottom-right peut chevaucher le footer sur mobile. Fix par `position: sticky`
7. **Logo SVG** est trop petit — actuellement 140px. Doit être ~200px en hero
8. **L'animation cross-symbol** d'origine a été remplacée par le logo mais la sub n'a plus d'animation subtile. Doit avoir un flame icon stable et visible

## Tech

9. **Pas de theme provider global** — le dark theme RainbowKit ne custom que le modal. Le reste de l'app ne hérite pas.
10. **Wagmi `useContractRead`** n'a pas `refetchInterval` pour poller les stats et la dernière block timestamp. En attendant indéfiniment, le countdown ne se met pas à jour.
11. **RainbowKit ConnectButton** — le bouton avant connexion est affiché en Arial/caractères par defaut. Pas stylisé en Cinzel par le theme (le `fontStack` custom marche que pour le modal).
12. **Le footer sucre avec le contract** mais pas de bouton copy/paste ni de verify sur explorer.
13. **Pas de CTA social** après "Not connected" — le user doit voir des liens (tweet/X, github) pour vérifier le project
14. **Le statut CLAIMABLE** pulse mais pas de warning dialog avant de claim. Dangereux si click accident.
15. **Pas de SEO meta tags** — twitter:card, og:image, theme-color.

## Design profond

16. **Pas de glass particle résiduelle** derrière le logo sur mobile
17. **Cache hierarchy** faible — 3 niveaux de hierarchy max. Devrait 5+. Ex: hero subheading devrait avoir l'air secondary, pas primary.
18. **Color palette trop limitée** — uniquement blood/bone/ember. Pas de "moon silver" pour night, ni de "ash grey" pour passive states, ni de "frost" pour activer en light.
19. **Pas de sound design** — un click sur bouton ne fait rien. Devrait avoir un `blip` (type theme) optionnel sur actions.
20. **Pas de onboarding/tooltip** — un nouveau user ne sait pas ce qu'est un "ritual" ou un "heir". Doit avoir des tooltips au hover.
21. **Pas de error boundary** — si erreur runtime, écran blanc. Doit y avoir un écran d'erreur gothique fallback.
22. **Pas de 404** — si user cliqued une route invalide. Pas besoin car single-page. Mais il faut un /404 générique fallback.

## Stratégie

23. **Pas d'overlay a "Project Info" button** — le user veut voir qui a build, hackathon, repo, etc. Doit avoir un info-icon en coin top-right avec modal overlay.
24. **Pas de video/youtube embeded** — le demo video est marked optional. Doit afficher un placeholder et un youtube embed optionnel.
25. **Pas de keynote/intro** — devrait avoir une section "How it works" 3 steps animés avant le connect button.
26. **Pas de testimonials/social proof** — le logo Monad peut apparaître en bas: "Powered by Monad" + "Built at BuildAnything Spark".

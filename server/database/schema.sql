CREATE TABLE roles (
    role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    date_of_birth DATE,
    email VARCHAR(50) UNIQUE NOT NULL,
    phone VARCHAR(50),
    address VARCHAR(250),
    role_id INT,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE SET NULL
);

CREATE TABLE wine (
    wine_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    origin VARCHAR(100),
    price DECIMAL(10,2) NOT NULL,
    description TEXT DEFAULT NULL,
    CONSTRAINT price_positive CHECK (price > 0)
);

CREATE TABLE wine_images (
    image_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    wine_id INT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (wine_id) REFERENCES wine(wine_id) ON DELETE CASCADE
);

CREATE TABLE tasting (
    tasting_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    date DATE DEFAULT NULL,
    location VARCHAR(255),
    city_name VARCHAR(50) NOT NULL,
    website_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE opinion (
    opinion_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    note DECIMAL(3,1) NOT NULL,
    description VARCHAR(200) NOT NULL,
    wine_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (wine_id) REFERENCES wine(wine_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT note_range CHECK (note >= 0 AND note <= 5)
);

CREATE TABLE questions (
    question_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    question_text TEXT NOT NULL
);

CREATE TABLE answers (
    answer_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    question_id INT NOT NULL,
    answer_text TEXT NOT NULL,
    score_value INT NOT NULL, -- Score de la reponse
    CONSTRAINT fk_question FOREIGN KEY (question_id) REFERENCES questions(question_id)
);

CREATE TABLE user_answers (
    user_answer_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    question_id INT NOT NULL,
    answer_id INT NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_question_2 FOREIGN KEY (question_id) REFERENCES questions(question_id),
    CONSTRAINT fk_answer FOREIGN KEY (answer_id) REFERENCES answers(answer_id)
);

CREATE TABLE taste_profiles (
    profile_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    min_score INT NOT NULL,
    max_score INT NOT NULL,
    profile_name VARCHAR(255) NOT NULL
);

CREATE TABLE user_scores (
    score_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_score INT NOT NULL,
    taste_profile_id INT,  -- Clé étrangère vers la table taste_profiles
    CONSTRAINT fk_user_score FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_taste_profile FOREIGN KEY (taste_profile_id) REFERENCES taste_profiles(profile_id)
);

CREATE TABLE wine_filters (
    filter_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    wine_id INT NOT NULL, 
    color VARCHAR(20),  -- Couleur du vin (Blanc, Rouge, Rosé)
    price_range VARCHAR(50), -- Plage de prix (par exemple : '0-20€', '20-50€', '50-100€', etc.)
    origin VARCHAR(100), -- Origine du vin (par exemple : 'Bordeaux', 'Italie', etc.)
    category VARCHAR(50), -- Catégorie du vin (par exemple : 'Sec', 'Doux', etc.)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (wine_id) REFERENCES wine(wine_id) ON DELETE CASCADE
);

INSERT INTO roles (name) VALUES ('admin'), ('client');

INSERT INTO users (firstname, lastname, date_of_birth, email, phone, address) VALUES
('Jean', 'Dupont', '1985-03-15', 'jean.dupont@email.com', '+33612345678', '123 Rue de Paris, Paris'),
('Marie', 'Martin', '1990-07-22', 'marie.martin@email.com', '+33623456789', '45 Avenue des Champs-Élysées, Paris'),
('Pierre', 'Bernard', '1988-11-30', 'pierre.bernard@email.com', '+33634567890', '78 Rue du Commerce, Lyon'),
('Sophie', 'Petit', '1992-04-18', 'sophie.petit@email.com', '+33645678901', '15 Rue de la République, Marseille'),
('Lucas', 'Moreau', '1987-09-25', 'lucas.moreau@email.com', '+33656789012', '32 Boulevard Victor Hugo, Nice');

INSERT INTO wine (name, category, origin, price, description) VALUES
("Château d'Esclans Garrus 2023", "Rosé", "Côtes-de-Provence", 115.00, "Un rosé prestigieux offrant une complexité aromatique exceptionnelle, avec des notes de fruits mûrs et une finale longue et élégante"),
("Domaine Vallon des Glauges 2023", "Rosé", "Coteaux-d'Aix-en-Provence", 12.50, "Un rosé équilibré et élégant, présentant des arômes de fruits rouges frais et une belle fraîcheur en bouche"),
("Château Maïme 2023", "Rosé", "Côtes-de-Provence", 15.00, "Un vin rosé frais et délicat, aux arômes de pêche et de fleurs blanches, idéal pour les repas estivaux"),
("Domaine Ray 2023", "Rosé", "Coteaux-d'Aix-en-Provence", 7.20, "Un rosé accessible et convivial, avec des notes de fraise et une légère acidité rafraîchissante"),
("Château Sainte-Roseline 2023", "Rosé", "Côtes-de-Provence", 20.00, "Un rosé biologique de grande qualité, aux arômes complexes de fruits exotiques et une texture soyeuse en bouche"),
("Domaine Jean-Marc Burgaud Morgon Corcelette 2022", "Rouge", "Beaujolais", 19.00, "Un vin élégant du Beaujolais, offrant des arômes de fruits rouges mûrs et une belle structure tannique"),
("Domaine d'Aupilhac Languedoc Montpeyroux Les Cocalières 2021", "Rouge", "Languedoc", 23.40, "Un vin du Languedoc aux notes épicées et fruitées, avec une complexité remarquable et une finale persistante"),
("Domaine de la Chevalerie Bourgueil Busardières 2019", "Rouge", "Vallée de la Loire", 26.00, "Un Bourgueil structuré et raffiné, présentant des arômes de cassis et de violette, avec une belle longueur en bouche"),
("Domaine La Calmette Cahors L'Espace Bleu entre les Nuages", "Rouge", "Sud-Ouest", 27.80, "Un Cahors moderne et élégant, aux notes de fruits noirs et d'épices, avec des tanins soyeux et une finale harmonieuse"),
("Domaine du Pas de l'Escalette Terrasses du Larzac Le Grand Pas 2022", "Rouge", "Languedoc", 30.00, "Un vin du Languedoc riche et puissant, offrant des arômes de garrigue et de fruits noirs, avec une belle fraîcheur"),
("Domaine de l'Aigle Chardonnay Blanc 2021", "Blanc", "Limoux", 24.90, "Un vin blanc sec aux arômes de fruits blancs et de fleurs blanches, offrant une belle fraîcheur et une finale persistante. Idéal avec des poissons grillés ou des fruits de mer"),
("Domaine Paul Cherrier Sancerre Blanc 2022", "Blanc", "Sancerre", 21.90, "Un Sancerre élégant avec des notes de fruits blancs, de fleurs et une minéralité marquée. Parfait pour accompagner poissons, fruits de mer ou fromages de chèvre"),
("Château Puygueraud Blanc 2021", "Blanc", "Côtes de Bordeaux", 12.00, "Assemblage de Sauvignon Blanc et Sémillon, ce vin offre des arômes de fruits blancs et d'agrumes, avec une belle acidité et une finale persistante. Idéal avec poissons, fruits de mer et viandes blanches"),
("Domaine Maby Lirac La Fermade Blanc 2022", "Blanc", "Lirac", 14.90, "Un vin blanc biologique aux arômes de fruits blancs, de fleurs et de miel, avec une belle fraîcheur et une finale longue. Parfait en apéritif ou avec des fruits de mer"),
("Domaine François Pinon Vouvray Moelleux 2018", "Blanc", "Vouvray", 21.95, "Un Vouvray moelleux biologique présentant des arômes de fruits blancs et de fleurs blanches, équilibré par une belle acidité. Idéal avec des poissons, fruits de mer ou fromages de chèvre"),
("Les Bulles de Laura", "Pétillant", "Bugey", 8.00, "Vinifiée selon la Méthode Ancestrale, cette cuvée offre une robe dorée avec un nez expressif et croquant aux notes fleuries. Fraîcheur et gourmandise caractérisent ce vin festif, idéal pour les desserts et apéritifs"),
("Cerdon Méthode Ancestrale", "Pétillant", "Bugey", 10.00, "Cette cuvée, issue de la Méthode Ancestrale, présente une robe rosée et des arômes de fruits rouges frais. Légère et fruitée, elle apporte une touche de fraîcheur en apéritif ou au dessert"),
("La Bulle", "Pétillant", "Provence", 18.30, "Un vin pétillant rosé élaboré en Provence, offrant des arômes délicats de fruits rouges et une effervescence fine. Parfait pour les moments de partage et de convivialité"),
("Crémant de Bourgogne Blanc", "Pétillant", "Bourgogne", 15.00, "Un Crémant de Bourgogne blanc, sec et élégant, avec des notes de fruits blancs et une belle fraîcheur. Idéal pour l'apéritif ou pour accompagner des fruits de mer"),
("Crémant d'Alsace Blanc", "Pétillant", "Alsace", 14.00, "Un Crémant d'Alsace blanc, offrant des arômes de fleurs blanches et de fruits à chair blanche, avec une effervescence fine et persistante. Parfait pour les célébrations ou en accompagnement de poissons grillés"),
("Pierre Gimonnet Brut Cuis 1er Cru", "Champagne", "Côte des Blancs", 33.95, "Un champagne Blanc de Blancs d'une finesse remarquable, offrant des notes florales et une grande fraîcheur. Idéal à l'apéritif pour réveiller les papilles"),
("Louis Roederer Brut Premier", "Champagne", "Reims", 45.00, "Un champagne élégant et harmonieux, avec des arômes de fruits blancs et une touche de brioche. Parfait pour les grandes occasions"),
("Veuve Clicquot Brut Yellow Label", "Champagne", "Reims", 50.00, "Un champagne emblématique, riche et crémeux, aux notes de fruits mûrs et de vanille. Idéal pour les célébrations"),
("Bollinger Special Cuvée Brut", "Champagne", "Aÿ", 55.00, "Un champagne puissant et raffiné, avec des arômes de fruits secs et une belle longueur en bouche. Parfait pour accompagner des plats gastronomiques"),
("Ruinart Blanc de Blancs", "Champagne", "Reims", 70.00, "Un champagne 100% Chardonnay, d'une grande pureté, aux notes d'agrumes et de fleurs blanches. Idéal pour les moments d'exception"),
("Château de Pibarnon Rouge 2021", "Rouge", "Bandol", 35.00, "Un Bandol d'une grande finesse, aux arômes de fruits noirs, d'épices et de garrigue. Parfait pour accompagner une viande rouge"),
("Domaine Tempier Rosé 2022", "Rosé", "Bandol", 38.00, "Un rosé élégant et structuré, offrant des notes de fruits rouges, de pêche et d'épices. Idéal pour les repas estivaux"),
("Domaine de la Janasse Blanc 2022", "Blanc", "Côtes-du-Rhône", 18.00, "Un vin blanc généreux et aromatique, aux notes de fleurs blanches et de fruits tropicaux. Parfait avec des poissons ou des volailles"),
("Pol Roger Réserve Brut", "Champagne", "Épernay", 42.00, "Un champagne classique et raffiné, aux arômes de pomme verte, de brioche et de miel. Idéal pour les grandes occasions"),
("Domaine de la Taille aux Loups Triple Zéro", "Pétillant", "Montlouis-sur-Loire", 21.50, "Un pétillant naturel sans sucre ajouté, offrant une grande fraîcheur et des arômes de fruits blancs. Idéal à l'apéritif"),
("Clos de la Roilette Fleurie Cuvée Tardive 2021", "Rouge", "Beaujolais", 25.00, "Un Fleurie complexe et élégant, aux notes de fruits rouges et de fleurs, avec une belle structure tannique"),
("Domaine Ott By.Ott Rosé 2022", "Rosé", "Côtes-de-Provence", 22.00, "Un rosé délicat et fruité, avec des arômes de fraise, de pêche et une touche d'agrumes. Idéal en apéritif ou avec des plats légers"),
("Château Smith Haut Lafitte Blanc 2021", "Blanc", "Pessac-Léognan", 70.00, "Un grand vin blanc de Bordeaux, aux arômes de fruits exotiques, de fleurs blanches et une belle complexité. Parfait pour un repas gastronomique"),
("Dom Pérignon Vintage 2013", "Champagne", "Épernay", 185.00, "Un champagne d'exception, offrant une richesse aromatique exceptionnelle et une finesse inégalée. Idéal pour les moments d'exception"),
("Domaine Hubert Lamy Saint-Aubin La Princée 2020", "Blanc", "Bourgogne", 48.00, "Un vin blanc minéral et précis, aux arômes de fruits à chair blanche et une belle fraîcheur. Parfait avec des fruits de mer"),
("Laurent-Perrier Cuvée Rosé", "Champagne", "Tours-sur-Marne", 70.00, "Un champagne rosé élégant, aux arômes de fruits rouges et une effervescence fine. Parfait pour les célébrations"),
("Domaine du Vissoux Moulin-à-Vent Les Trois Roches 2021", "Rouge", "Beaujolais", 30.00, "Un vin rouge puissant et structuré, aux notes de cerise noire et d'épices. Parfait pour accompagner une viande en sauce"),
("Domaine Leflaive Puligny-Montrachet 2020", "Blanc", "Bourgogne", 120.00, "Un grand vin blanc de Bourgogne, offrant une complexité remarquable et des arômes de fruits mûrs et de fleurs blanches"),
("Château Simone Rosé 2021", "Rosé", "Palette", 48.00, "Un rosé gastronomique, offrant des arômes complexes de fruits rouges, de fleurs et une touche minérale. Idéal pour accompagner des plats raffinés"),
("Taittinger Comtes de Champagne Blanc de Blancs 2012", "Champagne", "Reims", 160.00, "Un champagne 100% Chardonnay d'une grande élégance, aux arômes d'agrumes et de fruits secs"),
("Château d'Yquem 2019", "Blanc", "Sauternes", 250.00, "Un vin liquoreux légendaire, offrant une richesse aromatique exceptionnelle et une douceur parfaite. Idéal pour les desserts"),
("Louis Jadot Gevrey-Chambertin 2020", "Rouge", "Bourgogne", 55.00, "Un vin rouge élégant et puissant, aux arômes de fruits noirs, de réglisse et une touche boisée. Parfait pour une viande rouge"),
("Château Miraval Rosé 2022", "Rosé", "Côtes-de-Provence", 20.00, "Un rosé frais et fruité, aux notes de pêche, de fraise et une belle acidité. Idéal pour l'été"),
("Henriot Blanc de Blancs", "Champagne", "Reims", 45.00, "Un champagne 100% Chardonnay, offrant des arômes de fleurs blanches, de fruits secs et une belle finesse"),
("Domaine Zind-Humbrecht Riesling Grand Cru Rangen 2020", "Blanc", "Alsace", 65.00, "Un Riesling grand cru aux arômes de fruits mûrs, de minéralité et une belle acidité. Parfait avec des plats épicés"),
("Perrier-Jouët Belle Époque 2014", "Champagne", "Épernay", 180.00, "Un champagne d'exception, aux arômes floraux et fruités, avec une effervescence délicate"),
("Château Léoville-Las Cases 2018", "Rouge", "Saint-Julien", 250.00, "Un grand vin de Bordeaux, puissant et complexe, aux notes de fruits noirs et d'épices"),
("Château La Nerthe Blanc 2021", "Blanc", "Châteauneuf-du-Pape", 40.00, "Un vin blanc riche et complexe, aux arômes de fruits tropicaux, de fleurs et une touche boisée"),
("Domaine de la Mordorée Tavel La Dame Rousse 2022", "Rosé", "Tavel", 25.00, "Un rosé structuré et aromatique, aux notes de fruits rouges et une belle fraîcheur"),
("Krug Grande Cuvée", "Champagne", "Reims", 210.00, "Un champagne d'exception, riche et complexe, offrant des arômes de fruits mûrs, de noix et une effervescence fine");

INSERT INTO wine_images (wine_id, file_name, file_path)
VALUES
(1, '1.png', 'public/images/uploads/wines/1.png'),
(2, '2.png', 'public/images/uploads/wines/2.png'),
(3, '3.png', 'public/images/uploads/wines/3.png'),
(4, '4.png', 'public/images/uploads/wines/4.png'),
(5, '5.png', 'public/images/uploads/wines/5.png'),
(6, '6.png', 'public/images/uploads/wines/6.png'),
(7, '7.png', 'public/images/uploads/wines/7.png'),
(8, '8.png', 'public/images/uploads/wines/8.png'),
(9, '9.png', 'public/images/uploads/wines/9.png'),
(10, '10.png', 'public/images/uploads/wines/10.png'),
(11, '11.png', 'public/images/uploads/wines/11.png'),
(12, '12.png', 'public/images/uploads/wines/12.png'),
(13, '13.png', 'public/images/uploads/wines/13.png'),
(14, '14.png', 'public/images/uploads/wines/14.png'),
(15, '15.png', 'public/images/uploads/wines/15.png'),
(16, '16.png', 'public/images/uploads/wines/16.png'),
(17, '17.png', 'public/images/uploads/wines/17.png'),
(18, '18.png', 'public/images/uploads/wines/18.png'),
(19, '19.png', 'public/images/uploads/wines/19.png'),
(20, '20.png', 'public/images/uploads/wines/20.png'),
(21, '21.png', 'public/images/uploads/wines/21.png'),
(22, '22.png', 'public/images/uploads/wines/22.png'),
(23, '23.png', 'public/images/uploads/wines/23.png'),
(24, '24.png', 'public/images/uploads/wines/24.png'),
(25, '25.png', 'public/images/uploads/wines/25.png'),
(26, '26.png', 'public/images/uploads/wines/26.png'),
(27, '27.png', 'public/images/uploads/wines/27.png'),
(28, '28.png', 'public/images/uploads/wines/28.png'),
(29, '29.png', 'public/images/uploads/wines/29.png'),
(30, '30.png', 'public/images/uploads/wines/30.png'),
(31, '31.png', 'public/images/uploads/wines/31.png'),
(32, '32.png', 'public/images/uploads/wines/32.png'),
(33, '33.png', 'public/images/uploads/wines/33.png'),
(34, '34.png', 'public/images/uploads/wines/34.png'),
(35, '35.png', 'public/images/uploads/wines/35.png'),
(36, '36.png', 'public/images/uploads/wines/36.png'),
(37, '37.png', 'public/images/uploads/wines/37.png'),
(38, '38.png', 'public/images/uploads/wines/38.png'),
(39, '39.png', 'public/images/uploads/wines/39.png'),
(40, '40.png', 'public/images/uploads/wines/40.png'),
(41, '41.png', 'public/images/uploads/wines/41.png'),
(42, '42.png', 'public/images/uploads/wines/42.png'),
(43, '43.png', 'public/images/uploads/wines/43.png'),
(44, '44.png', 'public/images/uploads/wines/44.png'),
(45, '45.png', 'public/images/uploads/wines/45.png'),
(46, '46.png', 'public/images/uploads/wines/46.png'),
(47, '47.png', 'public/images/uploads/wines/47.png'),
(48, '48.png', 'public/images/uploads/wines/48.png'),
(49, '49.png', 'public/images/uploads/wines/49.png'),
(50, '50.png', 'public/images/uploads/wines/50.png');


INSERT INTO tasting (name, date, location, city_name, website_url) VALUES
    ("Millésime Bio", "2025-01-27", "Parc des Expositions", "Montpellier", "https://www.millesime-bio.com"),
    ("Salon Vinidôme", "2025-01-31", "Grande Halle d'Auvergne", "Clermont-Ferrand", "https://www.salon-vinifrance.fr/les-salons/clermont-ferrand/"),
    ("Salon des Vins de Loire", "2025-02-03", "Parc des Expositions", "Angers", "https://salondesvinsdeloire.com/"),
    ("Wine Paris / Vinexpo", "2025-02-10", "Paris Porte de Versailles", "Paris", "https://wineparis.com/newfront"),
    ("Salon des Vins de Limoges", "2025-02-14", "Parc des Expositions", "Limoges", "https://www.salon-vinifrance.fr/les-salons/limoges/"),
    ("Salon des Vins Bio de Nantes", "2025-02-28", "Parc des Expositions", "Nantes", "https://www.club-vignerons-laureats.com/salon-des-vins-nantes/#:~:text=Les%2028%20f%C3%A9vrier%2C%201%20%26%202,du%20Ch%C3%A2teau%20de%20la%20Poterie."),
    ("Salon Vins et Terroirs Toulouse", "2025-03-07", "Parc des Expositions MEETT", "Toulouse", "https://www.salon-vins-terroirs-toulouse.com"),
    ("Salon des Vins des Vigerons Indépendants de Lyon", "2025-03-07", "Eurexpo", "Lyon", "https://www.vigneron-independant.com/19%C3%A8me-salon-des-vins-des-vignerons-ind%C3%A9pendants-lyon-eurexpo"),
    ("Salon de la Gastronomie et des Vins", "2025-03-21", "Parc des Expositions", "Caen", "https://www.abcsalles.com/agenda/salon-vins-gastronomie-caen"),
    ("Somm'Up", "2025-03-30", "Palais de la Méditerranée", "Nice", "https://www.salon-vin-nice.com"),
    ("Les Printemps de Châteauneuf-du-Pape", "2025-04-04", "Salle Dufays", "Châteauneuf-du-Pape", "https://www.lesprintempsdechateauneufdupape.fr"),
    ("SAVIM de printemps", "2025-03-21", "Parc Chanot", "Marseille", "https://www.salons-savim.fr"),
    ("Salon des Vins de Macon", "2025-04-25", "Parc des Expositions", "Mâcon", "https://www.salon-des-vins.fr/"),
    ("Salon de la Gastronomie des Vins et des Spiritueux", "2025-05-08", "Place du Bras d'Or", "Pont-l'Évêque", "https://www.calvados-tourisme.com/evenement/41eme-fete-du-fromage-salon-de-la-gastronomie-des-vins-et-spiritueux/"),
    ("Foire aux Vins d'Alsace", "2025-02-25", "Parc Expo de Colmar", "Strasbourg", "https://www.foire-colmar.com/fr/"),
    ("Salon Viti Loire", "2025-05-30", "Tours", "Tours", "https://www.tours.fr/"),
    ("Bacchus", "2025-03-28", "place d'Armes et ville de Toulon", "Toulon", "https://www.bacchus-fete.com/"),
    ("Salon des Vins de Sancerre", "2025-05-00", "Maison des Sancerre", "Sancerre", "https://www.vins-centre-loire.com/fr/foire-aux-vins-de-sancerre"),
    ("Bordeaux fête le vin", "2025-06-19", "Quais de la Garonne", "Bordeaux", "https://www.bordeaux-fete-le-vin.com/billetterie.html?o=Agenda-BFV"),
    ("Salon Vinexpo Bordeaux", "2025-06-16", "Sur les quais de Bordeaux", "Bordeaux", "https://www.vinexpobordeaux.com"),
    ("Salon des Vins du Jura", "2025-03-23", "Grand Gymnase", "Arbois", "https://lenezdanslevert.com/"),
    ("Salon des Vins Artisanaux et Naturels", "2025-03-21", "Hotel Amour Plage", "Nice, France", "https://www.vinsdazur.com/"),
    ("Salon des Vins d'Automne de Colmar", "2025-08-03", "Parc Expo", "Colmar", "https://www.foire-colmar.com/fr/"),
    ("Bacchus", "2025-06-05", "Parc de Valmy", "Argeles-sur-Mer", "https://festival-bacchus.fr/#:~:text=Rendez%2Dvous%20le%205%2C%206%20et%207%20juin%202025%20!"),
    ("Fête des Grands Vins de Bourgogne", "2026-11-14", "Palais des Congrès", "Beaune", "https://www.fetedesgrandsvins.fr/"),
    ("Salon de Paris-Vincennes", "2025-09-05", "Vincennes Hippodrome de Paris", "Paris", "https://www.mer-et-vigne.fr/salons/salon-dautomne-paris-vincennes"),
    ("Vin, Saveurs et Plantes d'Automne", "2025-10-18", "Parc Floral", "Apremont-sur-Allier", "https://www.apremont-sur-allier.com/19-20-octobre-2004-vin-saveurs-et-plantes-dautomne/#:~:text=Agenda-,18%20%26%2019%20Octobre%202025,et%20des%20produits%20du%20terroir."),
    ("Salon du Chocolat & Vins", "2025-10-31", "L'Autre Scène", "Vedène (Avignon)", "https://www.grandavignon-destinations.fr/agenda/salon-du-chocolat-vins/"),
    ("Salon des Vins de Chablis", "2025-10-25", "Chablis", "Chablis", "https://www.chablis.fr/decouvrez/des-traditions-bourguignonnes/la-fete-des-vins/la-fete-des-vins,1242,6986.html"),
    ("Aux Vignobles! Vin est Gastronomie de nos Régions", "2025-01-31", "Halle D'Iraty", "Biarritz", "https://www.auxvignobles.fr/biarritz/"),
    ("Salon des Vins des Vignerons Indépendants de Bordeaux", "2025-03-07", "Parc des Expositions", "Bordeaux", "https://www.jds.fr/bordeaux/foires-et-salons/foires/salon-des-vins-des-vignerons-independants-de-bordeaux-176761_A"),
    ("Salon des Vins Indépendants", "2025-03-21", "Espace Champerret", "Paris", "https://www.vigneron-independant.com/32%C3%A8me-salon-des-vins-des-vignerons-ind%C3%A9pendants-paris-champerret"),
    ("Salon Saveurs et Terroirs", "2025-11-28", "Parc des Expos", "Chambéry", "https://www.saveursetterroirs.com/"),
    ("TERRAVINI", "2025-10-24", "Palais Nikaïa", "Nice", "https://salons-terravini.fr/"),
    ("SAVIM d'Automne", "2025-11-21", "Parc Chanot", "Marseille", "https://www.salons-savim.fr/"),
    ("Salon des Vins des Vignerons Indépendants Paris", "2025-11-28", "Parc des Expositions Porte de Versailles", "Paris", "https://www.vigneron-independant.com"),
    ("Le Grand Tasting", "2025-11-28", "Carrousel du Louvre, Paris, France", "Paris", "https://www.grandtasting.com"),
    ("Salon des Vins et Gourmandises", "2025-02-28", "Complexe sportif Jean Claverie à Laigné en Belin", "Laigne-Saint-Gervais", "https://clubdesloisirslaigne.fr/"),
    ("Salon d'Annecy", "2025-10-17", "Route de Thône", "Annecy", "https://www.mer-et-vigne.fr/salons/salon-annecy-le-vieux-espace-rencontre");

    
INSERT INTO opinion (note, description, wine_id, user_id) VALUES
(4.5, "Vin excellent avec une belle complexité. Très équilibré, j'ai adoré!", 1, 1),
(3.8, "Un bon vin, mais je trouve que le goût manque un peu de profondeur.", 2, 2),
(5.0, "Absolument incroyable! La qualité de ce vin est exceptionnelle.", 3, 3),
(2.5, "Le vin n'est pas à la hauteur de mes attentes. Un peu trop amer.", 4, 4),
(4.0, "Très bon vin, agréable et bien structuré. À recommander.", 5, 5),
(3.2, "Un bon vin mais pas assez de caractère pour moi. Un peu trop léger.", 6, 1),
(4.7, "Arômes de fruits confits et une belle longueur en bouche, un de mes préférés!", 7, 2),
(4.3, "Très bon rapport qualité/prix, avec des notes fruitées et épicées.", 8, 3),
(4.9, "Vin robuste, mais très élégant. Un must pour les amateurs!", 9, 4),
(3.0, "Un peu trop acide pour mon goût, mais reste correct.", 10, 5),
(4.4, "Une belle bouteille, agréable à boire et facile à apprécier.", 11, 1),
(3.5, "Un vin un peu trop sucré à mon goût, mais il est assez rafraîchissant.", 12, 2),
(4.6, "Très agréable avec des poissons. Les arômes sont parfaits.", 13, 3),
(5.0, "Un classique! Dom Pérignon ne déçoit jamais. Parfait pour des occasions spéciales.", 14, 4),
(4.0, "Parfait pour l'été, léger et frais, très bon vin rosé.", 15, 5),
(3.7, "Pas mal du tout, mais un peu trop sec à mon goût.", 16, 1),
(4.2, "Un vin agréable avec des arômes d’épices, parfait pour les viandes grillées.", 17, 2),
(4.8, "Un vin d'exception pour accompagner les desserts. Très doux et équilibré.", 18, 3),
(3.9, "Bon vin mais peut-être un peu trop intense pour un dîner léger.", 19, 4),
(5.0, "Un vin riche et complexe. Parfait pour les grandes occasions.", 20, 5);

INSERT INTO questions (question_text) VALUES
("Quel niveau d'acidité aimez-vous dans un vin ?"),
("Préférez-vous un vin léger ou puissant ?"),
("Quel arôme recherchez-vous dans un vin ?"),
("Préférez-vous un vin sec ou sucré ?"),
("Quel type de vin préférez vous?");

-- Question 1 : Quel niveau d'acidité aimez-vous dans un vin ?
INSERT INTO answers (question_id, answer_text, score_value) VALUES
(1, 'Faible acidité', 1),
(1, 'Acidité modérée', 2),
(1, 'Acidité élevée', 3);

-- Question 2 : Préférez-vous un vin léger ou puissant ?
INSERT INTO answers (question_id, answer_text, score_value) VALUES
(2, 'Léger', 1),
(2, 'Modéré', 2),
(2, 'Puissant', 3);

-- Question 3 : Quel arôme recherchez-vous dans un vin ?
INSERT INTO answers (question_id, answer_text, score_value) VALUES
(3, 'Fruité', 1),
(3, 'Épicé', 2),
(3, 'Boisé', 3),
(3, 'Floral', 4);

-- Question 4 : Préférez-vous un vin sec ou sucré ?
INSERT INTO answers (question_id, answer_text, score_value) VALUES
(4, 'Sec', 1),
(4, 'Demi-sec', 2),
(4, 'Sucré', 3);

-- Question 5 : Quel type de vin préférez-vous ?
INSERT INTO answers (question_id, answer_text, score_value) VALUES
(5, 'Rouge', 1),
(5, 'Blanc', 2),
(5, 'Rosé', 3);

-- Réponses des utilisateurs

INSERT INTO user_answers (user_id, question_id, answer_id) VALUES
(1, 1, 2),  -- Jean Dupont répond à la première question (acidité modérée)
(1, 2, 3),  -- Jean Dupont répond à la deuxième question (puissant)
(1, 3, 1),  -- Jean Dupont répond à la troisième question (fruity)
(1, 4, 1),  -- Jean Dupont répond à la quatrième question (sec)
(1, 5, 1),  -- Jean Dupont répond à la cinquième question (rouge)

-- Marie Martin avec user_id = 2
(2, 1, 3),  -- Marie Martin répond à la première question (acidité élevée)
(2, 2, 1),  -- Marie Martin répond à la deuxième question (léger)
(2, 3, 2),  -- Marie Martin répond à la troisième question (épicé)
(2, 4, 2),  -- Marie Martin répond à la quatrième question (demi-sec)
(2, 5, 2);  -- Marie Martin répond à la cinquième question (blanc)

-- Insérer les profils de goût en fonction des scores
INSERT INTO taste_profiles (min_score, max_score, profile_name) VALUES
(0, 5, 'Adepte des vins légers'),  -- Scores entre 0 et 5 : Profil "Adepte des vins légers"
(6, 10, 'Explorateur de vins'),    -- Scores entre 6 et 10 : Profil "Explorateur de vins"
(11, 15, 'Épicurien'),             -- Scores entre 11 et 15 : Profil "Épicurien"
(16, 20, 'Connaisseur des grands crus'); -- Scores entre 16 et 20 : Profil "Connaisseur des grands crus"

-- Insérer les scores des utilisateurs
-- Ce score correspond au profil "Épicurien" (score entre 11 et 15)

INSERT INTO user_scores (user_id, total_score, taste_profile_id) VALUES
(1, 12, 3);  -- Profil "Épicurien" a `profile_id = 3`

-- Ajouter des filtres pour les vins
INSERT INTO wine_filters (wine_id, color, price_range, origin, category) VALUES
(1, 'Rouge', '0-50€', 'Bordeaux', 'Sec'), -- Château Margaux : Rouge, moins de 50€, Bordeaux, sec
(2, 'Rouge', '200-500€', 'Bourgogne', 'Fruité'), -- Domaine de la Romanée-Conti : Rouge, entre 200€ et 500€, Bourgogne, fruité
(3, 'Rouge', '400-800€', 'Pomerol', 'Riche'), -- Pétrus : Rouge, entre 400€ et 800€, Pomerol, riche
(4, 'Rouge', '50-100€', 'Italie', 'Tannique'), -- Sassicaia : Rouge, entre 50€ et 100€, Italie, tannique
(10, 'Blanc', '20-50€', 'Allemagne', 'Acide'), -- Riesling Trocken : Blanc, entre 20€ et 50€, Allemagne, acide
(11, 'Rouge', '0-30€', 'Argentine', 'Fruité'), -- Malbec Argentin : Rouge, moins de 30€, Argentine, fruité
(12, 'Blanc', '20-50€', 'Loire', 'Sec'); -- Pouilly-Fumé : Blanc, entre 20€ et 50€, Loire, sec


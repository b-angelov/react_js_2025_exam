import React from "react";

export default function TilePlaceholder() {
    return (
        <React.Fragment key={"empty-article"}>
            <article className="empty-article-tile">
                <main>
                    <span>Рождественник</span>
                </main>
            </article>
        </React.Fragment>
    )
}